import { Col, Gap } from "@vape/lib/resolveGrid";
import { Field } from "./form";

export type CustomBuilder = {
    type: "custom";
    col?: Col;
    gap?: Gap;
    component: string;
    model?: string;
    modelMethod?: string;
    authUser?: Record<string, any>;
    name?: string;
    returnTypes?: Field["type"];
    defaultValue?: any;
    noCard?: boolean;
};
