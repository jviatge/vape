"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/tools";
import { ActionProps } from "@vape/types/modules/table/table";
import Link from "next/link";
import { useContext } from "react";
import FormModule from "../form/Form.module";
import { resolveVarStringObject } from "../lib/getData";
import TableContext from "./context/Table.context";

export const Action = ({
    action,
    dataRow,
}: {
    action: ActionProps;
    dataRow?: Record<string, any>;
}) => {
    const TC = useContext(TableContext);

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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size="icon"
                            type="button"
                            variant={"outline"}
                            className="pointer-events-auto h-7 w-7 border"
                        >
                            <Icon name={action.icon} className="h-3.5 w-3.5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{action.title}</DialogTitle>
                            {/*  <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription> */}
                        </DialogHeader>
                        {action.form && dataRow ? (
                            <FormModule id={dataRow.id} formBuilder={action.form} data={dataRow} />
                        ) : null}
                        {/* <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter> */}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    ) : null;
};
