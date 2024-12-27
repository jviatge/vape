"use client";

import { FormLabel } from "@vape/components/ui/form";
import { Input } from "@vape/components/ui/input";
import { Textarea } from "@vape/components/ui/textarea";
import { Span, resolveSpanClass } from "@vape/lib/resolveGrid";
import { Check, X } from "lucide-react";

export const RenderViews = ({
    label,
    type,
    name,
    data,
    span,
}: {
    span?: Span;
    label?: string;
    type: InputBuilder["type"];
    name?: string;
    data: Record<string, any>;
}) => {
    const value = name ? data[name] : null;

    return (
        <div className={`flex flex-col relative ${resolveSpanClass(span)}`}>
            {label ? (
                <FormLabel className="mb-2">
                    <span className="text-xs">{label}</span>
                </FormLabel>
            ) : null}
            <>
                {type === "text" || type === "select" || (type === "number" && name) ? (
                    <Input type="text" disabled={true} defaultValue={value} value={value} />
                ) : null}

                {type === "textarea" && (
                    <Textarea rows={3} disabled={true} defaultValue={value} value={value} />
                )}

                {/* {type === "date" && <DatePicker field={field} />} */}

                {type === "checkbox" ||
                    (type === "switch" &&
                        (value ? (
                            <Check className="text-green-500" />
                        ) : (
                            <X className="text-red-500" />
                        )))}
            </>
        </div>
    );
};
