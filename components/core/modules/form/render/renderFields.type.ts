import { Span } from "@vape/lib/resolveGrid";
import { CustomBuilder } from "./custom/CustomRender.type";
import { DecorateBuilder } from "./decorate/DecorateRender.type";
import { InputBuilder } from "./input/InputRender.type";

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

export type FieldBuilder = DecorateBuilder | InputBuilder | CustomBuilder;
