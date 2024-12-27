"use client";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { InputBuilder } from "@vape/types/modules/form/form";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import FormGeneralContext from "../../context/FormGeneral.context";
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
                                <span className="text-xs"> *</span>
                            ) : null}
                        </FormLabel>
                    ) : null}

                    {inputBuilder.type === "text" ? (
                        <FormControl>
                            <Input disabled={disabled} type="text" {...field} />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "password" ? (
                        <FormControl>
                            <Input
                                tabIndex={0}
                                disabled={disabled}
                                type="password"
                                id={inputBuilder.name}
                                {...field}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "textarea" ? (
                        <FormControl>
                            <Textarea
                                tabIndex={0}
                                disabled={disabled}
                                id={inputBuilder.name}
                                rows={3}
                                {...field}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "number" ? (
                        <FormControl>
                            <Input
                                tabIndex={0}
                                disabled={disabled}
                                type="number"
                                id={inputBuilder.name}
                                {...field}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "date" ? (
                        <FormControl>
                            <DatePicker
                                minDate={inputBuilder.minDate}
                                disabled={disabled}
                                field={field}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "time" ? (
                        <FormControl>
                            <TimePicker field={field} />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "checkbox" ? (
                        <FormControl>
                            <Checkbox
                                tabIndex={0}
                                disabled={disabled}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "switch" ? (
                        <FormControl>
                            <Switch
                                tabIndex={0}
                                disabled={disabled}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "select" ? (
                        <FormControl>
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
                        </FormControl>
                    ) : null}

                    {inputBuilder.type === "manyToOne" ? (
                        <div
                            className={`flex flex-col relative ${resolveSpanClass(
                                inputBuilder.span
                            )}`}
                        >
                            <ManyToOneInput {...inputBuilder} />
                        </div>
                    ) : null}
                    {inputBuilder.description ? (
                        <FormDescription>{inputBuilder.description}</FormDescription>
                    ) : null}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
