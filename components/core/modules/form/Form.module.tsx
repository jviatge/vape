"use client";

import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";
import { queryPostByModule, queryPutByModule } from "@vape/actions/queries";
import { CancelButtonRsc } from "@vape/components/ui/CancelButtonRsc";
import { Button } from "@vape/components/ui/button";
import { LoadingButton } from "@vape/components/ui/loading";
import { useToast } from "@vape/components/ui/use-toast";
import { Col, Gap, resolveColumnsClass } from "@vape/lib/resolveGrid";
import { cn } from "@vape/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FieldBuilder, RenderFields } from "./RenderFields";
import { defaultValues } from "./resolver/defaultValue";
import { validationSchema } from "./resolver/validationSchema";

export type FormBuilder = {
    type: "form";
    model: string;
    get?: string;
    post: string;
    fields: FieldBuilder[];
    className?: string;
    col?: Col;
    gap?: Gap;
};

interface FormModuleProps {
    formBuilder: FormBuilder;
    containerPage?: boolean;
    data: Record<string, any>;
    id?: string;
    rscId?: string;
}

const FormModule: React.FC<FormModuleProps> = ({ formBuilder, data, id, rscId, containerPage }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const mode: "create" | "edit" = id ? "edit" : "create";

    const form = useForm<any>({
        resolver: validationSchema(formBuilder.fields),
        defaultValues: defaultValues(data, formBuilder.fields),
    });

    const handleSubmit = async (
        data: Record<string, any>,
        button: "save" | "create" | "createAndCreateAnother"
    ) => {
        setLoading(true);
        try {
            let response = null;
            if (id) {
                response = await queryPutByModule({
                    data,
                    model: formBuilder.model,
                    put: formBuilder.post,
                    id,
                });
            } else {
                response = await queryPostByModule({
                    data,
                    model: formBuilder.model,
                    post: formBuilder.post,
                });
            }

            if (!response.data.id) throw new Error("No id in response");

            setLoading(false);

            toast({
                title: "Succès",
                description:
                    button === "save" || button === "createAndCreateAnother"
                        ? "Ressource créée avec succès !"
                        : "Enregistrée",
            });

            if (button === "save" || button === "create")
                router.push(`/${rscId}/${response.data.id}`);

            if (button === "createAndCreateAnother") {
                form.reset();
            }
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
        <FormProvider {...form}>
            <Form {...form}>
                <form
                    className={cn(
                        resolveColumnsClass(formBuilder.col ?? 4, formBuilder.gap ?? 5),
                        /* (typeof containerPage === "undefined" || containerPage) && "container-page", */
                        formBuilder.className && formBuilder.className
                    )}
                >
                    <RenderFields fieldBuilders={formBuilder.fields} form={form} />
                </form>
                <div className="space-y-3 md:space-y-0 space-x-0 md:space-x-3 pt-3 flex flex-col md:flex-row">
                    {mode === "edit" ? (
                        <Button
                            disabled={isLoading}
                            onClick={form.handleSubmit((data) => handleSubmit(data, "save"))}
                        >
                            {/* Save changes */}
                            <LoadingButton isLoading={isLoading}>
                                Sauvegarder les modifications
                            </LoadingButton>
                        </Button>
                    ) : (
                        <>
                            <Button
                                disabled={isLoading}
                                onClick={form.handleSubmit((data) => handleSubmit(data, "create"))}
                            >
                                {/* Create */}
                                <LoadingButton isLoading={isLoading}>Créer</LoadingButton>
                            </Button>
                            <Button
                                disabled={isLoading}
                                variant={"secondary"}
                                onClick={form.handleSubmit((data) =>
                                    handleSubmit(data, "createAndCreateAnother")
                                )}
                            >
                                <LoadingButton isLoading={isLoading} variant={"secondary"}>
                                    Créer et créer un autre
                                </LoadingButton>
                            </Button>
                        </>
                    )}
                    <CancelButtonRsc type={"button"} />
                </div>
            </Form>
            <DevTool control={form.control} />
        </FormProvider>
    );
};

export default FormModule;
