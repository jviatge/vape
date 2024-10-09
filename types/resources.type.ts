import { IconProps } from "@vape/components/Icon";
import { FormBuilder } from "@vape/components/core/modules/form/Form.module";
import { MakeForm } from "@vape/components/core/modules/formBuilder/FormBuilder";
import { Span } from "@vape/lib/resolveGrid";
import { TableBuilder } from "./modules/table/table";

export type ResourceParams = {
    label: string;
    icon: IconProps["name"];
    separator?: boolean;
    order: number;
    disabledCreate?: boolean;
    disabledEdit?: boolean;
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
    noCard?: boolean;
};

export type Module = {
    span?: Span;
} & (TableBuilder | FormBuilder | MakeForm | TypeCustomModule);

export type Resource = {
    params: ResourceParams;
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
