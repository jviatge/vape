import { Permissions } from "@vape/lib/permissions";
import { useSearchParams } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { TableBuilder } from "../Table.module";
import TablesContext from "./Table.context";

const TablesProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: {
        tableBuilder: TableBuilder;
        permissions?: Permissions;
        defaultParams: Record<string, any>;
    };
}) => {
    // Resolve default params
    const resolveDefaultParams: Record<string, any> = useMemo(() => {
        let resolvedValue: Record<string, any> = {};
        Object.keys(value.defaultParams).map((key) => {
            if (key.startsWith("sort-")) {
                const newKey = key.replace("sort-", "");
                resolvedValue["sort"] = {
                    ...resolvedValue["sort"],
                    [String(newKey)]: value.defaultParams[key],
                };
            } else {
                resolvedValue[key] = value.defaultParams[key];
            }
        });
        return resolvedValue;
    }, []);

    const searchParams = useSearchParams();
    const [notification, setNotification] = useState(0);
    const [selectIds, setSelectIds] = useState<number[]>([]);
    const [selectID, setSelectID] = useState<number | null>(null);
    const [searchInput, setSearchInput] = useState(resolveDefaultParams["search-input"] ?? "");
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState<Record<string, string>>(resolveDefaultParams["sort"] ?? {});
    const [get, setGet] = useState<string>(
        resolveDefaultParams["get"] ??
            (typeof value.tableBuilder.get === "string"
                ? value.tableBuilder.get
                : value.tableBuilder.get[0].get)
    );

    return (
        <TablesContext.Provider
            value={{
                get,
                setGet,
                sort,
                setSort,
                selectIds,
                setSelectIds,
                selectID,
                setSelectID,
                notification,
                setNotification,
                filter,
                searchInput,
                setSearchInput,
                setFilter,
                searchParams,
                tableBuilder: value.tableBuilder,
                permissions: value.permissions,
            }}
        >
            {children}
        </TablesContext.Provider>
    );
};

export default TablesProvider;
