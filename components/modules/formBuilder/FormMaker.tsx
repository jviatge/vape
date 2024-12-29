"use client";

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Button } from "@vape/components/ui/button";
import { Card } from "@vape/components/ui/card";
import { Input } from "@vape/components/ui/input";
import { Loading } from "@vape/components/ui/loading";
import { toast } from "@vape/components/ui/use-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import DesignerContextProvider from "./context/DesignerContext";
import useDesigner from "./hooks/useDesigner";

export type MakeForm = {
    type: "make-form";
};

const FormMaker = ({ form }: { form: any }) => {
    return (
        <div className="flex w-full flex-grow mx-auto h-screen">
            <DesignerContextProvider>
                <FormBuilderContent form={form} />
            </DesignerContextProvider>
        </div>
    );
};

function FormBuilderContent({ form }: { form: any }) {
    const { setElements, setSelectedElement } = useDesigner();
    const [isReady, setIsReady] = useState(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // 10px
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        if (isReady) return;
        const elements = JSON.parse(form.content);
        setElements(elements);
        setSelectedElement(null);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout);
    }, [form, setElements, isReady, setSelectedElement]);

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <Loading />
            </div>
        );
    }

    const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

    if (form.published) {
        return (
            <DesignerContextProvider>
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="max-w-md">
                        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                            🎊🎊 Form Published 🎊🎊
                        </h1>
                        <h2 className="text-2xl">Share this form</h2>
                        <h3 className="text-xl text-muted-foreground border-b pb-10">
                            Anyone with the link can view and submit the form
                        </h3>
                        <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl} />
                            <Button
                                className="mt-2 w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    toast({
                                        title: "Copied!",
                                        description: "Link copied to clipboard",
                                    });
                                }}
                            >
                                Copy link
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={"link"} asChild>
                                <Link href={"/"} className="gap-2">
                                    <ArrowLeft />
                                    Go back home
                                </Link>
                            </Button>
                            <Button variant={"link"} asChild>
                                <Link href={`/forms/${form.id}`} className="gap-2">
                                    Form details
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </DesignerContextProvider>
        );
    }

    return (
        <DndContext sensors={sensors}>
            <Card className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id} />
                                <PublishFormBtn id={form.id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </Card>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormMaker;
