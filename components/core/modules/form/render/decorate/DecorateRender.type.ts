import { Col, Gap } from "@vape/lib/resolveGrid";
import { baseField } from "../renderFields.type";
import { DecorateContainerProps } from "./fields/Container.decorate";
import { DecorateSectionProps } from "./fields/Section.decorate";

export interface BaseDecorate extends baseField {
    col?: Col;
    gap?: Gap;
    data?: Record<string, any>;
    onlyRead?: boolean;
}

export type DecorateBuilder = DecorateContainerProps | DecorateSectionProps;
