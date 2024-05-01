import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Filter } from "./filterTable";

export type Option = {
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
    label: string;
    title?: string;
    description?: string;
    icon: keyof typeof dynamicIconImports;
    multiple: boolean;
    component: string;
    single: boolean;
    permissons?: string[];
    props?: Record<string, any>;
};

export type CompActionProps = {
    props?: Record<string, any>;
    setActionDialog: Dispatch<SetStateAction<ActionDialogType>>;
    data: {
        // Select one id
        selectRowData: Record<string, any> | null;
        setSelectRowData: Dispatch<SetStateAction<Record<string, any>>>;
        // Select multiple ids
        selectRowsDatas: Record<string, any>[];
        setSelectRowsDatas: Dispatch<SetStateAction<Record<string, any>[]>>;
    };
    isSingle?: boolean;
    isMultiple?: boolean;
};

export type TableBuilder = {
    type: "table";
    model: string;
    remove?: string;
    searchInputField?: string[];
    actions?: ActionProps[];
    get:
        | string
        | {
              label: string;
              get: string;
          }[];
    fields: FieldTable[];
};

type Data = Record<string, any>[];
