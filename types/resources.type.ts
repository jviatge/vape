import { Span } from "@vape/lib/resolveGrid";
import { FormBuilder } from "./modules/form/form";
import { TableBuilder } from "./modules/table/table";

export type ResourceParams = {
    label: string;
    icon: string; // https://lucide.dev/icons/
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
    model?: string;
    modelMethod?: string;
    noCard?: boolean;
};

/* export type Module = {
    type: "table" | "form";
    span?: Span;
} & (TableBuilder | FormBuilder | MakeForm | TypeCustomModule); */
export type BaseModule = {
    span?: Span;
};

export type TableModule = BaseModule & {
    type: "table";
} & TableBuilder;

export type FormModule = BaseModule & {
    type: "form";
} & FormBuilder;

export type CustomModule = BaseModule & TypeCustomModule;

export type Module = FormModule | TableModule | CustomModule;

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
