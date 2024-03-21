"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { Loading } from "@vape/components/ui/loading";
import { ActionProps, ActionPropsLoad } from "@vape/types/modules/table/table";
import { Suspense, lazy, useContext, useMemo, useState } from "react";
import TableContext from "./context/Table.context";

export const Action = ({
    action,
    dataRow,
}: {
    action: ActionPropsLoad;
    dataRow?: Record<string, any> | Record<string, any>[];
}) => {
    const TC = useContext(TableContext);
    const [open, setOpen] = useState(false);

    return action.single && dataRow ? (
        <div className="mr-1">
            {!open ? (
                <Button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(true);
                        TC.setSelectRowData(dataRow);
                    }}
                    variant={"outline"}
                    className="p-2 h-6 pointer-events-auto"
                >
                    <Icon name={action.icon} size={15} />
                </Button>
            ) : (
                <LoadAction
                    state={{ open, setOpen }}
                    component={action.component}
                    props={{ setOpen, data: dataRow }}
                    action={action}
                />
            )}
        </div>
    ) : null;
};

export const LoadAction = ({
    component,
    props,
    action,
    state,
}: {
    component: string;
    props: ActionProps;
    action: ActionPropsLoad;
    state: { open: boolean; setOpen: (open: boolean) => void };
}) => {
    const DynamicComponent = useMemo(
        () => lazy(() => import(`../../../../../actions/${component}`)),
        [component]
    );

    return (
        <Suspense
            fallback={
                <Button type="button" variant={"outline"} className="p-2 h-6 pointer-events-auto">
                    <Loading className="h-4 w-4" />
                </Button>
            }
        >
            <Dialog open={state.open} onOpenChange={state.setOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant={"outline"}
                        className="p-2 h-6 pointer-events-auto"
                    >
                        <Icon name={action.icon} size={15} />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        {action.title ? <DialogTitle>{action.title}</DialogTitle> : null}
                        {action.description ? (
                            <DialogDescription>{action.description}</DialogDescription>
                        ) : null}
                    </DialogHeader>

                    <DynamicComponent {...props} />
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};
