import { Permissions } from "@vape/lib/permissions";
import { Dispatch, SetStateAction, createContext } from "react";
import { TableBuilder } from "../Table.module";

export type TableContext = {
    // Get model
    get: string;
    setGet: Dispatch<SetStateAction<string>>;
    // Sort
    sort: Record<string, string>;
    setSort: Dispatch<SetStateAction<Record<string, string>>>;
    // Search Input
    searchInput: string;
    setSearchInput: Dispatch<SetStateAction<string>>;
    // Filter
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
    // Notification search
    notification: number;
    setNotification: Dispatch<SetStateAction<number>>;
    // Select one id
    selectID: number | null;
    setSelectID: Dispatch<SetStateAction<number | null>>;
    // Select multiple ids
    selectIds: number[];
    setSelectIds: Dispatch<SetStateAction<number[]>>;
    // Search params
    searchParams: URLSearchParams;
    /* setSearchParams: URLSearchParams; */
    //////////////////////////
    tableBuilder: TableBuilder;
    permissions?: Permissions;
};

export default createContext<TableContext>({} as TableContext);
