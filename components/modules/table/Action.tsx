"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/tools";
import { ActionProps } from "@vape/types/modules/table";
import Link from "next/link";
import { useState } from "react";
import FormModule from "../form/Form.module";
import { resolveVarStringObject } from "./getData";

export const Action = ({
    action,
    dataRow,
}: {
    action: ActionProps;
    dataRow?: Record<string, any>;
}) => {
    const [open, setOpen] = useState(false);

    return action.single && dataRow ? (
        <div className="mx-2">
            {action.linkTo ? (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "pointer-events-auto h-7 w-7 borde border-white"
                    )}
                    href={resolveVarStringObject(action.linkTo, dataRow)}
                >
                    <Icon name={action.icon} className="h-3.5 w-3.5" />
                </Link>
            ) : (
                <>
                    <Button
                        size="icon"
                        type="button"
                        variant={"outline"}
                        onClick={() => setOpen(true)}
                        className="pointer-events-auto h-7 w-7 border"
                    >
                        <Icon name={action.icon} className="h-3.5 w-3.5" />
                    </Button>
                    <Dialog onOpenChange={setOpen} open={open}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{action.title}</DialogTitle>
                                {action.description ? (
                                    <DialogDescription>{action.description}</DialogDescription>
                                ) : null}
                            </DialogHeader>
                            {action.form && dataRow ? (
                                <FormModule
                                    ids={[String(dataRow.id)]}
                                    formBuilder={action.form}
                                    data={dataRow}
                                    cancelCallback={() => setOpen(false)}
                                    onSuccesSubmit={() => setOpen(false)}
                                />
                            ) : null}
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </div>
    ) : null;
};
