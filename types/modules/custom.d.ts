import { Col, Gap } from "@vape/lib/resolveGrid";
import { FieldForm } from "./form";

export type CustomBuilder = {
    type: "custom";
    col?: Col;
    gap?: Gap;
    component: string;
    model?: string;
    modelMethod?: string;
    authUser?: Record<string, any>;
    name?: string;
    returnTypes?: FieldForm["type"];
    defaultValue?: any;
    noCard?: boolean;
};
