"use client";

import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";
import { useQueryClient } from "@tanstack/react-query";
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
import { FormGeneralProvider } from "./context/FormGeneral.Provider";
import { RenderFields } from "./render/RenderFields";
import { FieldBuilder } from "./render/renderFields.type";
import { defaultValues } from "./resolver/defaultValue";
import { validationSchema } from "./resolver/validationSchema";

export type FormBuilder = {
    type: "form";
    model: string;
    get?: string;
    post?: string;
    put?: string;
    fields: FieldBuilder[];
    className?: string;
    col?: Col;
    gap?: Gap;
};

interface FormModuleProps {
    formBuilder: FormBuilder;
    data: Record<string, any>;
    id?: string;
    rscId?: string;
    submitButtonOutID?: string;
    onSuccesSubmit?: (data: Record<string, any>) => void;
}

const FormModule: React.FC<FormModuleProps> = ({
    formBuilder,
    data,
    id,
    rscId,
    submitButtonOutID,
    onSuccesSubmit,
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const mode: "create" | "edit" = id ? "edit" : "create";
    const queryClient = useQueryClient();

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
            if (id && formBuilder.put) {
                response = await queryPutByModule({
                    data,
                    model: formBuilder.model,
                    put: formBuilder.put,
                    id,
                });
                queryClient.invalidateQueries({ queryKey: [formBuilder.model] });
            } else {
                if (formBuilder.post) {
                    response = await queryPostByModule({
                        data,
                        model: formBuilder.model,
                        post: formBuilder.post,
                    });
                } else {
                    throw new Error("No post or put in formBuilder");
                }
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

            if (onSuccesSubmit) return onSuccesSubmit(response.data);

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
        <FormGeneralProvider
            value={{
                mode,
            }}
        >
            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        id={submitButtonOutID}
                        onSubmit={form.handleSubmit((data) => handleSubmit(data, "create"))}
                        className={cn(
                            resolveColumnsClass(formBuilder.col ?? 4, formBuilder.gap ?? 5),
                            /* (typeof containerPage === "undefined" || containerPage) && "container-page", */
                            formBuilder.className && formBuilder.className
                        )}
                    >
                        <RenderFields fields={formBuilder.fields} />
                    </form>
                    {!submitButtonOutID ? (
                        <div className="space-y-3 md:space-y-0 space-x-0 md:space-x-3 pt-3 flex flex-col md:flex-row">
                            {mode === "edit" ? (
                                <Button
                                    disabled={isLoading || !form.formState.isDirty}
                                    onClick={form.handleSubmit((data) =>
                                        handleSubmit(data, "save")
                                    )}
                                >
                                    {/* Save changes */}
                                    <LoadingButton isLoading={isLoading}>
                                        Enregistrer les modifications
                                    </LoadingButton>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        disabled={isLoading || !form.formState.isDirty}
                                        onClick={form.handleSubmit((data) =>
                                            handleSubmit(data, "create")
                                        )}
                                    >
                                        {/* Create */}
                                        <LoadingButton isLoading={isLoading}>Créer</LoadingButton>
                                    </Button>
                                    <Button
                                        disabled={isLoading || !form.formState.isDirty}
                                        variant={"secondary"}
                                        onClick={form.handleSubmit((data) =>
                                            handleSubmit(data, "createAndCreateAnother")
                                        )}
                                    >
                                        <LoadingButton isLoading={isLoading} variant={"secondary"}>
                                            Enregistrer et créer un autre
                                        </LoadingButton>
                                    </Button>
                                </>
                            )}
                            <CancelButtonRsc type={"button"} />
                        </div>
                    ) : null}
                </Form>
                <DevTool control={form.control} />
            </FormProvider>
        </FormGeneralProvider>
    );
};

export default FormModule;
