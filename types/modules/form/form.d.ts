import { FieldBuilder } from "../../../components/core/modules/form/render/renderFields.type";
import { Col, Gap } from "../../grid/grid";

export type FieldForm = FieldBuilder;

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
