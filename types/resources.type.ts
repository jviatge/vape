import { TableBuilder } from "@vape/components/fields/modules/Table.module";
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
    table: TableBuilder;
    form: {
        name: string;
        type: string;
    }[];
};

export type RessourceParamsWithRoute = { route: string } & Resource["params"];
