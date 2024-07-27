import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useLazy from "@vape/hooks/useLazy";
import useLocalStorage from "@vape/hooks/useLocalStorage";
import { Permissions } from "@vape/lib/permissions";
import { CompActionProps, TableBuilder } from "@vape/types/modules/table/table";
import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from "react";
import useParamsTable from "../hook/useParamsTable";
import { makeFilter } from "./makeFilter";
import TablesContext, {
    ActionDialog as ActionDialogType,
    Query,
    SetQueryValue,
} from "./Table.context";

const TablesProvider = ({
    modeSelect,
    children,
    value,
}: {
    modeSelect?: "single" | "multiple";
    children: ReactNode;
    value: {
        tableBuilder: TableBuilder;
        permissions?: Permissions;
        defaultQuery: Query;
    };
}) => {
    const [mounted, setMounted] = useState(false);
    const { set, get, clearAll } = useParamsTable(modeSelect ? true : false);
    const [hideColumns, setUnselectColumnStorage] = useLocalStorage(
        "unselect-column-" + value.tableBuilder.model,
        value.tableBuilder.fields.filter((field) => field.hidden).map((field) => field.name)
    );

    const [notification, setNotification] = useState(0);
    const [loading, setLoading] = useState(false);
    const [actionDialog, setActionDialog] = useState<ActionDialogType>({
        open: false,
        component: null,
    });

    const [selectRowsDatas, setSelectRowsDatas] = useState<Record<string, any>[]>([]);
    const [selectRowData, setSelectRowData] = useState<Record<string, any> | null>(null);

    const resolveDefaultQuery = useCallback<
        (defaultQuery: Query, tableBuilder: TableBuilder) => Query
    >((defaultQuery: Query, tableBuilder: TableBuilder) => {
        const get =
            tableBuilder.get && Array.isArray(tableBuilder.get)
                ? tableBuilder.get.filter((v) => v?.default)[0]?.get
                    ? tableBuilder.get.filter((v) => v?.default)[0].get
                    : tableBuilder.get[0].get
                : tableBuilder.get;

        const resovleContains = (obj: Record<string, any>) => {
            Object.keys(obj).forEach((value) => {
                if (value.includes("|") && value.includes(".")) {
                    const key = value.split(".")[0];
                    const subKeys = value.split(".")[1].split("|");
                    obj[key] = {
                        OR: subKeys.map((subKey) => {
                            return {
                                [subKey]: { contains: obj[value] },
                            };
                        }),
                    };
                    delete obj[value];
                }
            });

            return obj;
        };

        return {
            get,
            search: defaultQuery.search ?? null,
            sort: defaultQuery.sort ?? {},
            select: defaultQuery.select ?? {},
            contains: resovleContains(defaultQuery.contains) ?? {},
            boolean: defaultQuery.boolean ?? {},
            datesRange: defaultQuery.datesRange ?? {},
            equals: defaultQuery.equals ?? {},
            page: defaultQuery.page ?? null,
        };
    }, []);

    const [query, setQuery] = useState<Query>(
        resolveDefaultQuery(value.defaultQuery, value.tableBuilder)
    );

    const setQueryValue = useCallback<SetQueryValue>(
        (key, action, field, value) => {
            // clear page if page is not in the query
            const page = get("page", "number");
            if (key !== "page" && page) setQuery((prev) => makeFilter.page(prev));

            value = String(value);
            if (!field) {
                if (action === "add") {
                    if (key === "get" || key === "search") {
                        set(String(value), key);
                        return setQuery((prev) => {
                            return {
                                ...prev,
                                [key]: String(value),
                            };
                        });
                    }
                } else {
                    set(null, key);
                    return setQuery((prev) => makeFilter.clearKey(prev, key));
                }
            }

            // set params query in url
            if (action === "add") set(String(value), key, field);
            if (action === "delete") set(null, key, field);

            switch (key) {
                case "search":
                    return setQuery((prev) => makeFilter.search(prev, value));
                case "sort":
                    return setQuery((prev) => makeFilter.sort(prev, field, value, action));
                case "select":
                case "contains":
                case "equals":
                case "datesRange":
                case "page":
                    return setQuery((prev) => {
                        return makeFilter.where(prev, key, field, value, action);
                    });
                case "boolean":
                    return setQuery((prev) => makeFilter.where(prev, key, field, true, action));
                default:
                    return setQuery((prev) => ({
                        ...prev,
                    }));
            }
        },
        [set, setQuery, get]
    );

    const queryCount = useCallback(() => {
        const count = Object.keys(query).reduce((acc, key: string) => {
            // @ts-ignore
            const value = query[key];
            if (key !== "page" && key !== "get") {
                if (typeof value === "string") {
                    if (value) {
                        /* console.log("value", key, value); */
                        return acc + 1;
                    }
                }
                if (value && Object.keys(value).length > 0) {
                    return acc + 1;
                }
            }
            return acc;
        }, 0);
        return count;
    }, [query]);

    const deleteAllQuery = useCallback(() => {
        /* console.log("deleteAllQuery", resolveDefaultQuery(value.defaultQuery, value.tableBuilder)); */
        clearAll();
        /* setQuery(resolveDefaultQuery(value.defaultQuery, value.tableBuilder)); */
    }, [setQuery, clearAll, resolveDefaultQuery, value]);

    const setHideColumnsValue = useCallback(
        (value: string[]) => setUnselectColumnStorage(value),
        [setUnselectColumnStorage]
    );

    return (
        <TablesContext.Provider
            value={{
                query,
                modeSelect,
                setQueryValue,
                queryCount,
                deleteAllQuery,
                hideColumns,
                setHideColumns: setHideColumnsValue,
                actionDialog,
                setActionDialog,
                selectRowsDatas,
                setSelectRowsDatas,
                selectRowData,
                setSelectRowData,
                notification,
                setNotification,
                loading,
                setLoading,
                tableBuilder: value.tableBuilder,
                permissions: value.permissions,
                mounted,
                setMounted,
            }}
        >
            {children}

            <ActionDialog
                shouldImport={actionDialog.open}
                setShouldImport={setActionDialog}
                component={actionDialog.component}
                componentProps={{
                    props: actionDialog.props,
                    setActionDialog,
                    data: {
                        selectRowData,
                        selectRowsDatas,
                        setSelectRowData,
                        setSelectRowsDatas,
                    },
                    isSingle: actionDialog.isSingle,
                    isMultiple: actionDialog.isMultiple,
                }}
            />
        </TablesContext.Provider>
    );
};

const ActionDialog = ({
    shouldImport,
    setShouldImport,
    component,
    componentProps,
}: {
    shouldImport: boolean;
    setShouldImport: Dispatch<SetStateAction<ActionDialogType>>;
    component: string | null;
    componentProps?: CompActionProps;
}) => {
    const { isLoading, result } = useLazy(
        useMemo(
            () => (component ? [() => import(`../../../../../../actions/${component}`)] : []),
            [component]
        ),
        shouldImport
    );

    // @ts-ignore
    const [LazyComponent] = result;
    return (
        <Dialog
            open={shouldImport}
            onOpenChange={(value: boolean) => {
                setShouldImport((prev) => ({ ...prev, open: value }));
            }}
        >
            <DialogContent>
                <DialogHeader>
                    {!isLoading && LazyComponent ? <LazyComponent {...componentProps} /> : null}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default TablesProvider;
