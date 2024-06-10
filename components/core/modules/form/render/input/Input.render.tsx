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
import { TimePicker } from "@vape/components/ui/time-picker";
import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import FormGeneralContext from "../../context/FormGeneral.context";
import { InputBuilder } from "./InputRender.type";
import { ManyToOneInput } from "./fields/ManyToOne.input";

export const RenderInputs = (inputBuilder: InputBuilder) => {
    const form = useFormContext();
    const formGeneral = useContext(FormGeneralContext);
    const disabled =
        formGeneral.mode === "edit" && inputBuilder.disabled?.edit
            ? true
            : formGeneral.mode === "create" && inputBuilder.disabled?.create
            ? true
            : false;
    return (
        <FormField
            key={inputBuilder.name}
            control={form.control}
            name={inputBuilder.name}
            render={({ field }) => (
                <FormItem
                    className={`flex flex-col relative ${resolveSpanClass(inputBuilder.span)}`}
                >
                    {inputBuilder.label ? (
                        <FormLabel>
                            {inputBuilder.label}
                            {inputBuilder?.rules?.required ? (
                                <span className="text-xs">*</span>
                            ) : null}
                        </FormLabel>
                    ) : null}
                    <FormControl>
                        {/* {JSON.stringify(disabled)} */}
                        <>
                            {/* {JSON.stringify(field)} */}
                            {inputBuilder.type === "text" && (
                                <Input disabled={disabled} type="text" {...field} />
                            )}

                            {inputBuilder.type === "password" && (
                                <Input
                                    disabled={disabled}
                                    type="password"
                                    id={inputBuilder.name}
                                    {...field}
                                />
                            )}

                            {inputBuilder.type === "textarea" && (
                                <Textarea
                                    disabled={disabled}
                                    id={inputBuilder.name}
                                    rows={3}
                                    {...field}
                                />
                            )}

                            {inputBuilder.type === "number" && (
                                <Input
                                    disabled={disabled}
                                    type="number"
                                    id={inputBuilder.name}
                                    {...field}
                                />
                            )}

                            {inputBuilder.type === "date" && (
                                <DatePicker
                                    minDate={inputBuilder.minDate}
                                    disabled={disabled}
                                    field={field}
                                />
                            )}

                            {inputBuilder.type === "time" && (
                                <TimePicker field={field} />
                                /*  <TimePicker onChange={field.onChange} value={field.value}>
                                 <TimePickerSegment segment={"hours"} />
                                 <TimePickerSeparator>:</TimePickerSeparator>
                                 <TimePickerSegment segment={"minutes"} />
                             </TimePicker> */
                            )}

                            {inputBuilder.type === "checkbox" && (
                                <Checkbox
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}

                            {inputBuilder.type === "switch" && (
                                <Switch
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}

                            {inputBuilder.type === "select" && (
                                <Select
                                    disabled={disabled}
                                    onValueChange={(value) => {
                                        value === "unassigned-select-control-value"
                                            ? field.onChange(null)
                                            : field.onChange(value);
                                    }}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {inputBuilder.nullable ? (
                                            <SelectItem
                                                value={"unassigned-select-control-value"}
                                                className="italic"
                                            >
                                                vide
                                            </SelectItem>
                                        ) : null}
                                        {inputBuilder.options?.map((option: any) => {
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

                            {inputBuilder.type === "manyToOne" ? (
                                <div
                                    className={`flex flex-col relative ${resolveSpanClass(
                                        inputBuilder.span
                                    )}`}
                                >
                                    <ManyToOneInput {...inputBuilder} />
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
