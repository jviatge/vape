"use client";

import { FormLabel } from "@vape/components/ui/form";
import { Input } from "@vape/components/ui/input";
import { Textarea } from "@vape/components/ui/textarea";
import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { Check, X } from "lucide-react";
import { InputBuilder } from "../input/InputRender.type";

export const RenderViews = ({
    fieldBuilder,
    data,
}: {
    fieldBuilder: InputBuilder;
    data: Record<string, any>;
}) => {
    const value = fieldBuilder?.name ? data[fieldBuilder.name] : null;

    return (
        <div className={`flex flex-col relative ${resolveSpanClass(fieldBuilder.span)}`}>
            {fieldBuilder.label ? (
                <FormLabel className="mb-2">
                    <span className="text-xs">{fieldBuilder.label}</span>
                </FormLabel>
            ) : null}
            <>
                {fieldBuilder.type === "text" ||
                fieldBuilder.type === "select" ||
                (fieldBuilder.type === "number" && fieldBuilder.name) ? (
                    <Input type="text" disabled={true} defaultValue={value} value={value} />
                ) : null}

                {fieldBuilder.type === "textarea" && (
                    <Textarea rows={3} disabled={true} defaultValue={value} value={value} />
                )}

                {/* {fieldBuilder.type === "date" && <DatePicker field={field} />} */}

                {fieldBuilder.type === "checkbox" ||
                    (fieldBuilder.type === "switch" &&
                        (value ? (
                            <Check className="text-green-500" />
                        ) : (
                            <X className="text-red-500" />
                        )))}
            </>
        </div>
    );
};
