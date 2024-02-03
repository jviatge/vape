"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { queryPostByModule, queryPutByModule } from "@vape/actions/queries";
import { Button } from "@vape/components/ui/button";
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
import { useToast } from "@vape/components/ui/use-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const resolveDefaultValues = (data: Record<string, any>, formBuilder: FormBuilder) => {
    if (!data) return {};
    const defaultValues: any = {};

    formBuilder.fields.map((field) => {
        switch (field.type) {
            case "date":
                defaultValues[field.name] = new Date(data[field.name]).toISOString().split("T")[0];
                break;

            default:
                defaultValues[field.name] = data[field.name];
                break;
        }
    });

    return defaultValues;
};

const FormModule: React.FC<FormModuleProps> = ({ formBuilder, data, id }) => {
    const { toast } = useToast();

    const [isLoading, setLoading] = useState(false);

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        //resolver: zodResolver(formSchema),
        defaultValues: resolveDefaultValues(data, formBuilder),
    });

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            let response = null;
            if (id) {
                response = await queryPutByModule({
                    data,
                    model: formBuilder.model,
                    post: formBuilder.post,
                    id,
                });
            } else {
                response = await queryPostByModule({
                    data,
                    model: formBuilder.model,
                    post: formBuilder.post,
                });
            }
            setLoading(false);
            toast({
                title: "Success",
                description: "ressource created successfully!",
            });
        } catch (error) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occured!",
            });
        }
    };

    return (
        <Form {...form}>
            {/* {"=>"} {JSON.stringify(data)} */}
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 grid">
                {formBuilder.fields.map((fieldData) => {
                    return <MakeField key={fieldData.name} form={form} {...fieldData} />;
                })}
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

const MakeField = (fieldData: any, form: any) => {
    return (
        <FormField
            key={fieldData.name}
            control={form.control}
            name={fieldData.name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{fieldData.label ?? fieldData.name}</FormLabel>
                    <FormControl>
                        <>
                            {fieldData.type === "text" && (
                                <Input type="text" id={fieldData.name} {...field} />
                            )}

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

export default FormModule;
