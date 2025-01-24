import { Span } from "@vape/lib/resolveGrid";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { FormBuilder } from "./modules/form";
import { FormMakerBuilder } from "./modules/formMaker";
import { TableBuilder } from "./modules/table";

export type ResourceParams = {
    label: string;
    icon: keyof typeof dynamicIconImports;
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

export type BaseModule = {
    span?: Span;
};

export type TableModule = BaseModule & {
    type: "table";
} & TableBuilder;

export type FormModule = BaseModule & {
    type: "form";
} & FormBuilder;

export type FormMakerModule = BaseModule & {
    type: "form-maker";
} & FormMakerBuilder;

export type CustomModule = BaseModule & TypeCustomModule;

export type Module = FormModule | TableModule | CustomModule | FormMakerModule;

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
