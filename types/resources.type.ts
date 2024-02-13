// import { TableBuilder } from "@vape/components/fields/modules/Table.module";
import { FormBuilder } from "@vape/components/core/modules/Form.module";
import { TableBuilder } from "@vape/components/core/modules/Table.module";
import { MakeForm } from "@vape/components/core/modules/formBuilder/FormBuilder";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type ResourceParams = {
    label: string;
    icon: keyof typeof dynamicIconImports;
    separator?: boolean;
    order: number;
    permissons?: {
        create?: string[];
        read?: string[];
        update?: string[];
        delete?: string[];
    };
};

export type Module = TableBuilder | FormBuilder | MakeForm;

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
    _id?: {
        modules: Module[];
    };
};

export type RessourceParamsWithRoute = { route: string } & Resource["params"];
