import { FormBuilder } from "@vape/components/core/modules/form/Form.module";
import { MakeForm } from "@vape/components/core/modules/formBuilder/FormBuilder";
import { TableBuilder } from "./modules/table/table";
import { IconProps } from "@vape/components/Icon";

export type ResourceParams = {
    label: string;
    icon: IconProps["name"];
    separator?: boolean;
    order: number;
    permissons?: {
        create?: string[];
        read?: string[];
        update?: string[];
        delete?: string[];
    };
};

export type TypeCustomModule = {
    type: "custom";
    component: string;
    model: string;
    modelMethod: string;
};

export type Module = TableBuilder | FormBuilder | MakeForm | TypeCustomModule;

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
