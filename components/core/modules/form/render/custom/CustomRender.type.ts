import { Col, Gap } from "@vape/lib/resolveGrid";
import { baseField } from "../renderFields.type";

export interface BaseCustom extends baseField {
    type: "custom";
    col?: Col;
    gap?: Gap;
    component: string;
    model: string;
    modelMethod: string;
    authUser?: Record<string, any>;
}

export type CustomBuilder = BaseCustom;
