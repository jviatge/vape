"use client";

import { Form } from "@/components/ui/form";
import { DevTool } from "@hookform/devtools";
import {
    queryPostByModule,
    queryPutByModule,
    queryPutMulitpleByModule,
} from "@vape/actions/queries";
import { CancelButtonRsc } from "@vape/components/ui/CancelButtonRsc";
import { Button } from "@vape/components/ui/button";
import { LoadingButton } from "@vape/components/ui/loading";
import { useToast } from "@vape/components/ui/use-toast";
import { queryClient } from "@vape/lib/queryClient";
import { Col, Gap, resolveColumnsClass } from "@vape/lib/resolveGrid";
import { cn } from "@vape/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormGeneralProvider } from "./context/FormGeneral.Provider";
import useLeaveConfirmation from "./hook/useLeaveConfirmation";
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
    extraData?: Record<string, any>;
    id?: string;
    ids?: string[];
    submitButtonOutID?: string;
    onSuccesSubmit?: (data: Record<string, any>) => void;
    authUser?: Record<string, any>;
    disabledLeaveConfirmation?: boolean;
    cancelCallback?: () => void;
}

const FormModule: React.FC<FormModuleProps> = ({
    formBuilder,
    data,
    extraData,
    id,
    ids,
    submitButtonOutID,
    onSuccesSubmit,
    authUser,
    disabledLeaveConfirmation,
    cancelCallback,
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const mode: "create" | "edit" = id || ids ? "edit" : "create";

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
            if (ids && ids.length > 0 && formBuilder.put) {
                response = await queryPutMulitpleByModule({
                    data,
                    model: formBuilder.model,
                    put: formBuilder.put,
                    ids,
                });
                queryClient.invalidateQueries({ queryKey: [formBuilder.model] });
            } else if (id && formBuilder.put) {
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
                    queryClient.invalidateQueries({ queryKey: [formBuilder.model] });
                } else {
                    throw new Error("No post or put in formBuilder");
                }
            }

            if (!response.data) throw new Error("No id in response");

            setLoading(false);

            toast({
                title: "Succès",
                description: mode === "create" ? "Ressource créée avec succès !" : "Enregistrée",
            });

            if (onSuccesSubmit) return onSuccesSubmit(response.data);

            if (button === "save" || button === "create") router.back();
            /* router.push(`/${rscId}/${response.data.id}`); */

            if (button === "createAndCreateAnother") {
                form.reset();
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur est survenue.",
            });
        }
    };

    const { confirmationDialog } = useLeaveConfirmation(
        form.formState.isDirty,
        disabledLeaveConfirmation
    );

    return (
        <FormGeneralProvider
            value={{
                extraData,
                mode,
                authUser,
                data,
            }}
        >
            {confirmationDialog}
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
                            <CancelButtonRsc type={"button"} cancelCallback={cancelCallback} />
                        </div>
                    ) : null}
                </Form>
                <DevTool control={form.control} />
            </FormProvider>
        </FormGeneralProvider>
    );
};

export default FormModule;
