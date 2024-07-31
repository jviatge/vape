"use client";

import { buttonVariants } from "@/components/ui/button";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/tools";
import { ActionProps } from "@vape/types/modules/table/table";
import Link from "next/link";
import { useContext } from "react";
import { resolveVarStringObject } from "../lib/getData";
import TableContext from "./context/Table.context";

export const Action = ({
    action,
    dataRow,
}: {
    action: ActionProps;
    dataRow?: Record<string, any> | Record<string, any>[];
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
                <Button
                    size="icon"
                    type="button"
                    onClick={(e) => {
                        if (action.component) {
                            e.preventDefault();
                            e.stopPropagation();
                            TC.setSelectRowData(dataRow);
                            TC.setActionDialog({
                                props: TC.tableBuilder?.actions
                                    ? TC.tableBuilder?.actions.find(
                                          (actionBuilder) =>
                                              actionBuilder.component === action.component
                                      )?.props
                                    : {},
                                open: true,
                                component: action.component,
                                isMultiple: false,
                                isSingle: true,
                            });
                        }
                    }}
                    variant={"outline"}
                    className="pointer-events-auto h-7 w-7 border"
                >
                    <Icon name={action.icon} className="h-3.5 w-3.5" />
                </Button>
            )}
        </div>
    ) : null;
};
