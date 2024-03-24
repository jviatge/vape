"use client";

import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { ActionProps } from "@vape/types/modules/table/table";
import { useContext } from "react";
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
        <div className="mr-1">
            <Button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    TC.setSelectRowData(dataRow);
                    TC.setActionDialog({
                        props: TC.tableBuilder.actions.find(
                            (actionBuilder) => actionBuilder.component === action.component
                        )?.props,
                        open: true,
                        component: action.component,
                        isMultiple: false,
                        isSingle: true,
                    });
                }}
                variant={"outline"}
                className="p-2 h-6 pointer-events-auto"
            >
                <Icon name={action.icon} size={15} />
            </Button>
        </div>
    ) : null;
};
