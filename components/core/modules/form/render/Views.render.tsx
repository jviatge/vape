"use client";

import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@vape/components/ui/checkbox";
import { Input } from "@vape/components/ui/input";
import { Textarea } from "@vape/components/ui/textarea";
import { Span, resolveSpanClass } from "@vape/lib/resolveGrid";
import { InputBuilder } from "./Inputs.render";

export const RenderViews = ({
    fieldBuilder,
    span,
    data,
}: {
    fieldBuilder: InputBuilder;
    span?: Span;
    data: Record<string, any>;
}) => {
    const value = fieldBuilder?.name ? data[fieldBuilder.name] : null;

    return (
        <div>
            {fieldBuilder.label ? <Label>{fieldBuilder.label}</Label> : null}
            <div className={`flex flex-col relative ${resolveSpanClass(span)}`}>
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
                            (value === "true" ? (
                                <Checkbox checked={true} />
                            ) : (
                                <Checkbox checked={false} />
                            )))}
                </>
            </div>
        </div>
    );
};
