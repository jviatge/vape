"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

export type FormBuilder = {
    type: "form";
    model: string;
    get?: string;
    post: string;
    fields: {
        label?: string;
        name: string;
        type: "text" | "password" | "date" | "checkbox" | "hour" | "select" | "textarea" | "number";
        options?: { label: string; value: string }[];
        format?: (value: any) => string;
    }[];
};

interface FormModuleProps {
    formBuilder: FormBuilder;
    data: Record<string, any>;
    id?: string;
}

export const RenderFields = (fieldData: any, form: any) => {
    return (
        <FormField
            key={fieldData.name}
            control={form.control}
            name={fieldData.name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>
                        {fieldData.label ?? fieldData.name}{" "}
                        {fieldData?.rules?.required ? <span className="text-xs">*</span> : null}
                    </FormLabel>
                    <FormControl>
                        <>
                            {fieldData.type === "text" && <Input type="text" {...field} />}

                            {fieldData.type === "password" && (
                                <Input type="password" id={fieldData.name} {...field} />
                            )}

                            {fieldData.type === "textarea" && (
                                <Textarea id={fieldData.name} rows={3} {...field} />
                            )}

                            {fieldData.type === "number" && (
                                <Input type="number" id={fieldData.name} {...field} />
                            )}

                            {fieldData.type === "date" && (
                                // <Input type="date" id={fieldData.name} {...field} />
                                <DatePicker field={field} />
                            )}

                            {/* {fieldData.type === "hour" && (
                                <Input type="time" id={fieldData.name} {...field} />
                            )} */}

                            {fieldData.type === "checkbox" && (
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            )}

                            {fieldData.type === "switch" && (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}

                            {fieldData.type === "select" && (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fieldData.options?.map((option: any) => {
                                            return (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                        </>
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
