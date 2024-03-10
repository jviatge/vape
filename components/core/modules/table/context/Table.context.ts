import { Permissions } from "@vape/lib/permissions";
import { Dispatch, SetStateAction, createContext } from "react";
import { TableBuilder } from "../Table.module";

export type TableContext = {
    get: string;
    setGet: Dispatch<SetStateAction<string>>;
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    notification: number;
    setNotification: Dispatch<SetStateAction<number>>;
    selectID: number | null;
    setSelectID: Dispatch<SetStateAction<number | null>>;
    selectIds: number[];
    setSelectIds: Dispatch<SetStateAction<number[]>>;
    searchParams: URLSearchParams;
    setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
    tableBuilder: TableBuilder;
    permissions?: Permissions;
};

export default createContext<TableContext>({} as TableContext);
