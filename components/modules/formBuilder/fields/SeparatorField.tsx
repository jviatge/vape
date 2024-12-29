"use client";

import { Label } from "@vape/components/ui/label";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";

import { Separator } from "@vape/components/ui/separator";
import { Minus } from "lucide-react";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: Minus,
        label: "Separator field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Separator field</Label>
            <Separator />
        </div>
    );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <Separator />;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <p>No properties for this element</p>;
}
