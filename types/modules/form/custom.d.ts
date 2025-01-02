import { Gap } from "@vape/lib/resolveGrid";

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
    defaultValue?: any;
    noCard?: boolean;
}

export type CustomBuilder = BaseCustom;
