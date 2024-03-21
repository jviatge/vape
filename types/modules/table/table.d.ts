import dynamicIconImports from "lucide-react/dynamicIconImports";
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

export type ActionProps = {
    setOpen: (value: boolean) => void;
    data: Record<string, any> | Record<string, any>[];
    isSingle?: boolean;
    isMultiple?: boolean;
};

export type ActionPropsLoad = {
    label: string;
    title?: string;
    description?: string;
    icon: keyof typeof dynamicIconImports;
    multiple: boolean;
    component: string;
    single: boolean;
    permissons?: string[];
    model?: string;
    modelMethod?: string;
};

export type TableBuilder = {
    type: "table";
    model: string;
    remove: string;
    searchInputField?: string[];
    actions: ActionPropsLoad[];
    get:
        | string
        | {
              label: string;
              get: string;
          }[];
    fields: FieldTable[];
};

type Data = Record<string, any>[];
