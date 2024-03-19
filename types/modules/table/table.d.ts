import { Filter } from "./filterTable";

type Option = {
    label: string;
    value: string;
    color?: string;
};

export type FieldTable = {
    options?: Option[];
    label?: string;
    name: string;
    type: "string" | "date" | "boolean" | "hour" | "badge";
    format?: (value: any) => string;
    filter?: Filter;
    hidden?: boolean;
};

export type TableBuilder = {
    type: "table";
    model: string;
    remove: string;
    searchInputField?: string[];
    get:
        | string
        | {
              label: string;
              get: string;
          }[];
    fields: FieldTable[];
};

type Data = Record<string, any>[];
