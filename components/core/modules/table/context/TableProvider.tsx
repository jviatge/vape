import { Permissions } from "@vape/lib/permissions";
import { TableBuilder } from "@vape/types/modules/table/table";
import { ReactNode, useCallback, useState } from "react";
import useParamsTable from "../hook/useParamsTable";
import TablesContext, { Query, SetQueryValue } from "./Table.context";

const TablesProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: {
        tableBuilder: TableBuilder;
        permissions?: Permissions;
        defaultQuery: Query;
    };
}) => {
    const { set, get, clearAll } = useParamsTable();

    const [notification, setNotification] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectIds, setSelectIds] = useState<number[]>([]);
    const [selectID, setSelectID] = useState<number | null>(null);

    const resolveDefaultQuery = () => ({
        get:
            value.defaultQuery.get ??
            (Array.isArray(value.tableBuilder.get)
                ? // @ts-ignore
                  value.tableBuilder.get[0].get
                : value.tableBuilder.get),
        search: value.defaultQuery.search ?? null,
        sort: value.defaultQuery.sort ?? {},
        select: value.defaultQuery.select ?? {},
        contains: value.defaultQuery.contains ?? {},
        boolean: value.defaultQuery.boolean ?? {},
        datesRange: value.defaultQuery.datesRange ?? {},
        equals: value.defaultQuery.equals ?? {},
        page: value.defaultQuery.page ?? null,
    });

    const [query, setQuery] = useState<Query>(resolveDefaultQuery());

    const setQueryValue = useCallback<SetQueryValue>(
        (key, action, field, value) => {
            // clear page if page is not in the query
            const page = get("page", "number");
            if (key !== "page" && page) {
                setQuery((prev) => {
                    return {
                        ...prev,
                        page: {
                            ...prev.page,
                            number: undefined,
                        },
                    };
                });
            }

            value = String(value);
            if (field !== undefined) {
                // ADD //
                if (action === "add") {
                    set(String(value), key, field);
                    if (
                        key === "sort" ||
                        key === "select" ||
                        key === "contains" ||
                        key === "equals" ||
                        key === "datesRange" ||
                        key === "page"
                    ) {
                        return setQuery((prev) => ({
                            ...prev,
                            [key]: {
                                ...prev[key],
                                [field]: String(value),
                            },
                        }));
                    }
                    if (key === "boolean") {
                        return setQuery((prev) => ({
                            ...prev,
                            [key]: {
                                ...prev[key],
                                [field]: true,
                            },
                        }));
                    }
                    if (key === "search") {
                        return setQuery((prev) => ({
                            ...prev,
                            search: value as string,
                        }));
                    }
                }
                // DELETE //
                set(null, key, field);
                if (
                    key === "sort" ||
                    key === "select" ||
                    key === "contains" ||
                    key === "equals" ||
                    key === "boolean" ||
                    key === "datesRange"
                ) {
                    return setQuery((prev) => {
                        const { [field]: _, ...rest } = prev[key];
                        return {
                            ...prev,
                            [key]: rest,
                        };
                    });
                }
                if (key === "search" || key === "get") {
                    return setQuery((prev) => ({
                        ...prev,
                        [key]: null,
                    }));
                }
            } else {
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
                    return setQuery((prev) => {
                        return {
                            ...prev,
                            [key]: null,
                        };
                    });
                }
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
                        console.log("value", key, value);
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
    }, [
        query.contains,
        query.boolean,
        query.datesRange,
        query.equals,
        query.get,
        query.page,
        query.search,
        query.select,
        query.sort,
    ]);

    const deleteAllQuery = useCallback(() => {
        setQuery(resolveDefaultQuery());
        clearAll();
    }, [setQuery]);

    return (
        <TablesContext.Provider
            value={{
                query,
                setQueryValue,
                queryCount,
                deleteAllQuery,
                selectIds,
                setSelectIds,
                selectID,
                setSelectID,
                notification,
                setNotification,
                loading,
                setLoading,
                tableBuilder: value.tableBuilder,
                permissions: value.permissions,
            }}
        >
            {children}
        </TablesContext.Provider>
    );
};

export default TablesProvider;
