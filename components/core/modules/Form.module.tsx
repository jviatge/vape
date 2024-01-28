"use client";

import { Card } from "@vape/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export type FormBuilder = {
    type: "form";
    model: string;
    get: string;
    fields: {
        label?: string;
        name: string;
        type: "string" | "date" | "boolean" | "hour" | "badge";
        format?: (value: any) => string;
    }[];
};

interface FormModuleProps {
    formBuilder: FormBuilder;
    data: Record<string, any>[];
}

const FormModule: React.FC<FormModuleProps> = ({ formBuilder, data }) => {
    const router = useRouter();
    const pathname = usePathname();

    return <Card className="overflow-hidden">Form</Card>;
};

export default FormModule;
