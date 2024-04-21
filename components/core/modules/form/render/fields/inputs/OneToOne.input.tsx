import { Button } from "@vape/components/ui/button";
import { Card } from "@vape/components/ui/card";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FieldBuilder, RenderFields } from "../../../RenderFields";

export const OneToOneInput = ({
    value,
    fieldBuilder,
    form,
    name,
}: {
    value: any;
    fieldBuilder: FieldBuilder;
    form: UseFormReturn<any, any, undefined>;
    name: string;
}) => {
    return (
        <>
            {value && Object.keys(value).length > 0 ? (
                <Card className="w-full p-3 bg-transparent space-y-4 grid">
                    <div className="col-span-full flex justify-end">
                        <Button
                            type="button"
                            className="cursor-pointer rounded flex justify-center items-center w-11 h-11 text-destructive-foreground hover:bg-card border text-base"
                        >
                            <X size={24} strokeWidth={1.6} />
                        </Button>
                    </div>

                    {fieldBuilder?.fields ? (
                        <RenderFields
                            fieldBuilders={fieldBuilder.fields}
                            form={form}
                            addPrefix={name}
                        />
                    ) : null}
                </Card>
            ) : (
                <div>
                    <Button type="button" className="w-full">
                        <Plus size={24} strokeWidth={1.6} />
                    </Button>
                </div>
            )}
        </>
    );
};
