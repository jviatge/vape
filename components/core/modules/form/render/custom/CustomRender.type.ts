import { Col, Gap } from "@vape/lib/resolveGrid";
import { InputBuilder } from "../input/InputRender.type";
import { baseField } from "../renderFields.type";

export interface BaseCustom extends baseField {
    type: "custom";
    col?: Col;
    gap?: Gap;
    component: string;
    model: string;
    modelMethod: string;
    authUser?: Record<string, any>;
    name?: string;
    returnTypes?: InputBuilder["type"];
}

export type CustomBuilder = BaseCustom;
