import { Span } from "@vape/lib/resolveGrid";
import { RulesField } from "../../resolver/validationSchema";
import { FieldBuilder, baseField } from "../renderFields.type";
import { ManyToOneInputProps } from "./fields/ManyToOne.input";

export interface BaseInput extends baseField {
    label?: string;
    name: string;
    options?: { label: string; value: string }[];
    format?: (value: any) => string;
    rules?: RulesField;
    fields?: FieldBuilder[];
    span?: Span;
    show?: {
        watch: string;
        notEgual?: string[];
        egual?: string[];
        message?: string;
    }[];
    disabled?: {
        edit?: boolean;
        create?: boolean;
    };
    defaultValue?: any;
    nullable?: boolean;
    minDate?: "now" | string;
}

export type InputBuilder =
    | (BaseInput & {
          type:
              | "text"
              | "password"
              | "date"
              | "time"
              | "checkbox"
              | "hour"
              | "select"
              | "textarea"
              | "number"
              | "switch";
      })
    | ManyToOneInputProps;
