"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@vape/components/ui/badge";
import { Checkbox } from "@vape/components/ui/checkbox";
import { DatePicker } from "@vape/components/ui/date-picker";
import { Input } from "@vape/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@vape/components/ui/select";
import { Switch } from "@vape/components/ui/switch";
import { Textarea } from "@vape/components/ui/textarea";
import { Span, resolveSpanClass } from "@vape/lib/resolveGrid";
import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { FieldBuilder } from "../RenderFields";
import FormGeneralContext from "../context/FormGeneral.context";
import { RulesField } from "../resolver/validationSchema";
import { ManyToOneInput, ManyToOneInputProps } from "./fields/inputs/ManyToOne.input";

export type InputBuilder = {
    label?: string;
    name: string;
    type:
        | "text"
        | "password"
        | "date"
        | "checkbox"
        | "hour"
        | "select"
        | "textarea"
        | "number"
        | "switch"
        | "manyToOne";
    options?: { label: string; value: string }[];
    format?: (value: any) => string;
    rules?: RulesField;
    fields?: FieldBuilder[];
    span?: Span;
    show?: {
        watch: string;
        notEgual?: string[];
        egual?: string[];
    }[];
    disabled?: {
        edit?: boolean;
        create?: boolean;
    };
    defaultValue?: any;
};

export const RenderInputs = ({
    addPrefix,
    fieldBuilder,
    form,
    span,
}: {
    addPrefix?: string;
    fieldBuilder: InputBuilder;
    form: UseFormReturn<any, any, undefined>;
    span?: Span;
}) => {
    const prefix = addPrefix ? `${addPrefix}.` : "";
    const formGeneral = useContext(FormGeneralContext);
    const disabled =
        formGeneral.mode === "edit" && fieldBuilder.disabled?.edit
            ? true
            : formGeneral.mode === "create" && fieldBuilder.disabled?.create
            ? true
            : false;
    return (
        <FormField
            key={prefix + fieldBuilder.name}
            control={form.control}
            name={prefix + fieldBuilder.name}
            render={({ field }) => (
                <FormItem className={`flex flex-col relative ${resolveSpanClass(span)}`}>
                    {fieldBuilder.label ? (
                        <FormLabel>
                            {fieldBuilder.label}
                            {fieldBuilder?.rules?.required ? (
                                <span className="text-xs">*</span>
                            ) : null}
                        </FormLabel>
                    ) : null}
                    <FormControl>
                        {/* {JSON.stringify(disabled)} */}
                        <>
                            {/* {JSON.stringify(field)} */}
                            {fieldBuilder.type === "text" && (
                                <Input disabled={disabled} type="text" {...field} />
                            )}

                            {fieldBuilder.type === "password" && (
                                <Input
                                    disabled={disabled}
                                    type="password"
                                    id={fieldBuilder.name}
                                    {...field}
                                />
                            )}

                            {fieldBuilder.type === "textarea" && (
                                <Textarea
                                    disabled={disabled}
                                    id={fieldBuilder.name}
                                    rows={3}
                                    {...field}
                                />
                            )}

                            {fieldBuilder.type === "number" && (
                                <Input
                                    disabled={disabled}
                                    type="number"
                                    id={fieldBuilder.name}
                                    {...field}
                                />
                            )}

                            {fieldBuilder.type === "date" && (
                                <DatePicker disabled={disabled} field={field} />
                            )}

                            {fieldBuilder.type === "checkbox" && (
                                <Checkbox
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}

                            {fieldBuilder.type === "switch" && (
                                <Switch
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}

                            {fieldBuilder.type === "select" && (
                                <Select
                                    disabled={disabled}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fieldBuilder.options?.map((option: any) => {
                                            return (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.color ? (
                                                        <Badge
                                                            className="text-xs dark:text-white text-black text-nowrap overflow-hidden"
                                                            variant={"default"}
                                                            style={{
                                                                backgroundColor: option.color,
                                                            }}
                                                        >
                                                            {option.label}
                                                        </Badge>
                                                    ) : (
                                                        option.label
                                                    )}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}

                            {fieldBuilder.type === "manyToOne" ? (
                                <div className={`flex flex-col relative ${resolveSpanClass(span)}`}>
                                    <ManyToOneInput
                                        {...(fieldBuilder as InputBuilder & ManyToOneInputProps)}
                                    />
                                </div>
                            ) : null}
                        </>
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
