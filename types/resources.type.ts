// import { TableBuilder } from "@vape/components/fields/modules/Table.module";
import { FormBuilder } from "@vape/components/core/modules/Form.module";
import { TableBuilder } from "@vape/components/core/modules/Table.module";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type ResourceParams = {
    label: string;
    icon: keyof typeof dynamicIconImports;
    separator?: boolean;
    order: number;
};

export type Module = TableBuilder | FormBuilder;

export type Resource = {
    params: ResourceParams;
    header?: {
        disabledCreate?: boolean;
        disabledEdit?: boolean;
    };
    index: {
        modules: Module[];
    };
    create?: {
        modules: Module[];
    };
    _id: {
        modules: Module[];
    };
};

export type RessourceParamsWithRoute = { route: string } & Resource["params"];
