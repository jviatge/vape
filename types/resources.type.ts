import dynamicIconImports from "lucide-react/dynamicIconImports";

export type ResourceParams = {
    label: string;
    icon: keyof typeof dynamicIconImports;
    model: string;
    separator?: boolean;
    order: number;
};

export type Resource = {
    params: ResourceParams;
    header?: {
        disabledCreate?: boolean;
        disabledEdit?: boolean;
    };
    table: {
        label?: string;
        name: string;
        type: "string" | "date" | "boolean" | "hour";
        format?: (value: any) => string;
    }[];
    form: {
        name: string;
        type: string;
    }[];
};

export type RessourceParamsWithRoute = { route: string } & Resource["params"];
