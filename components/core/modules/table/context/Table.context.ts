import { Permissions } from "@vape/lib/permissions";
import { TableBuilder } from "@vape/types/modules/table/table";
import { Dispatch, SetStateAction, createContext } from "react";

export type Query = {
    get: string | null;
    search: string | null;
    sort: Record<string, "asc" | "desc">;
    select: Record<string, string>;
    contains: Record<string, string>;
    boolean: Record<string, boolean>;
    datesRange: Record<string, string>;
    equals: Record<string, string>;
    page: {
        number?: number;
        limit?: number;
        lastPage?: boolean;
    } | null;
};

export type SetQueryValue = (
    key: keyof Query,
    action: "add" | "delete",
    field: string | undefined,
    value?: string | boolean
) => void;

export type TableContext = {
    // Query filter/search
    query: Query;
    setQueryValue: SetQueryValue;
    deleteAllQuery: () => void;
    queryCount: () => number;
    // Notification search
    notification: number;
    setNotification: Dispatch<SetStateAction<number>>;
    // hide/show columns
    hideColumns: string[];
    setHideColumns: (value: string[]) => void;
    // Select one id
    selectRowData: Record<string, any> | null;
    setSelectRowData: Dispatch<SetStateAction<Record<string, any>>>;
    // Select multiple ids
    selectRowsDatas: Record<string, any>[];
    setSelectRowsDatas: Dispatch<SetStateAction<Record<string, any>[]>>;
    //////////////////////////
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    tableBuilder: TableBuilder;
    permissions?: Permissions;
};

export default createContext<TableContext>({} as TableContext);
