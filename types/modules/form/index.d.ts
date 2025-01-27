import { Col, Gap, Span } from "@vape/lib/resolveGrid";
import { FieldForm } from "@vape/types/modules/form";

export type baseField = {
    span?: Span;
    show?: {
        watch: string;
        notEgual?: string[];
        egual?: string[];
        message?: string;
    }[];
    col?: Col;
    gap?: Gap;
};

export type DecorateContainer = {
    type: "container";
    label?: string;
    description?: string;
    icon?: IconProps["name"];
    fields: FieldForm[];
    noBorder?: boolean;
    data?: Record<string, any>;
    onlyRead?: boolean;
    show?: {
        watch: string;
        notEgual?: string[];
        egual?: string[];
    }[];
} & baseField;

export type DecorateSections = {
    type: "sections";
    data?: Record<string, any>;
    onlyRead: boolean;
    tabs: {
        label: string;
        name: string;
        description?: string;
        disabled?: boolean;
        fields: FieldForm[];
    }[];
} & baseField;

export type DecorateBuilder = DecorateContainer | DecorateSections;

type BaseInput = {
    label?: string;
    defaultValue?: any;
    description?: string;
    rules?: Record<string, any>;
    disabled?: {
        edit?: boolean;
        create?: boolean;
    };
} & baseField;

export type InputCustom = {
    type: "custom";
    name?: string;
    component: string;
    model?: string;
    modelMethod?: string;
    authUser?: Record<string, any>;
    name?: string;
    returnTypes?: FieldForm["type"];
    defaultValue?: any;
    noCard?: boolean;
} & BaseInput;

type InputText = {
    type: "text";
    name: string;
} & BaseInput;

type InputPassword = {
    type: "password";
    name: string;
} & BaseInput;

type InputNumber = {
    type: "number";
    name: string;
} & BaseInput;

type InputTextArea = {
    type: "textarea";
    name: string;
} & BaseInput;

type InputDate = {
    type: "date";
    minDate?: string;
    name: string;
} & BaseInput;

type InputCheckbox = {
    type: "checkbox";
    name: string;
} & BaseInput;

type InputTime = {
    type: "time";
    name: string;
} & BaseInput;

type InputSwitch = {
    type: "switch";
    name: string;
} & BaseInput;

type InputSelect = {
    type: "select";
    nullable?: boolean;
    name: string;
    options: {
        label: string;
        value: string;
    }[];
} & BaseInput;

type InputManyToOne = {
    type: "manyToOne";
    multiple?: boolean;
    formBuilder?: FormBuilder;
    tableBuilder?: TableBuilder;
    //form: UseFormReturn<any, any, undefined>;
    name: string;
    display?: "select" | "modal";
    disabled?: {
        create?: boolean;
        edit?: boolean;
        select?: boolean;
    };
} & BaseInput;

export type InputBuilder =
    | InputText
    | InputPassword
    | InputNumber
    | InputTextArea
    | InputDate
    | InputCheckbox
    | InputTime
    | InputSelect
    | InputSwitch
    | InputManyToOne;

export type FieldForm = DecorateBuilder | InputBuilder | InputCustom;

export interface baseField {
    label?: string;
    description?: string;
    span?: Span;
    show?: {
        watch: string;
        notEgual?: string[];
        egual?: string[];
        message?: string;
    }[];
}

export declare type FormBuilder = {
    type: "form";
    model: string;
    get?: string;
    post?: string;
    put?: string;
    fields: FieldForm[];
    className?: string;
    col?: Col;
    gap?: Gap;
};
