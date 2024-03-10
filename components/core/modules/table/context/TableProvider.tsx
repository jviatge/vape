import { Permissions } from "@vape/lib/permissions";
import { ReactNode, useState } from "react";
import { TableBuilder } from "../Table.module";
import TablesContext from "./Table.context";

const TablesProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: { tableBuilder: TableBuilder; permissions?: Permissions };
}) => {
    const [notification, setNotification] = useState(0);
    const [selectIds, setSelectIds] = useState<number[]>([]);
    const [selectID, setSelectID] = useState<number | null>(null);
    const [filter, setFilter] = useState("");
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [get, setGet] = useState<string>(
        typeof value.tableBuilder.get === "string"
            ? value.tableBuilder.get
            : value.tableBuilder.get[0].get
    );

    return (
        <TablesContext.Provider
            value={{
                get,
                setGet,
                selectIds,
                setSelectIds,
                selectID,
                setSelectID,
                notification,
                setNotification,
                filter,
                setFilter,
                searchParams,
                setSearchParams,
                tableBuilder: value.tableBuilder,
                permissions: value.permissions,
            }}
        >
            {children}
        </TablesContext.Provider>
    );
};

export default TablesProvider;
