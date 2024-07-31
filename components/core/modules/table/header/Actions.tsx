import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/lib/utils";
import { ChevronDown, Play, Trash } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { DeleteAction } from "../actions/Delete";
import TableContext from "../context/Table.context";

export const Actions = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);
    const [Selected, setSelected] = useState<null | string>(null);
    const [runActionDelete, setRunActionDelete] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    const selectedAction: any =
        Selected === "Delete"
            ? {
                  label: "Supprimer",
                  icon: "trash",
                  single: true,
              }
            : TC.tableBuilder?.actions?.find((action) => action.component === Selected);

    const isActionCustom =
        TC.tableBuilder.actions &&
        TC.tableBuilder.actions.length > 0 &&
        TC.tableBuilder.actions.some((action) => action.multiple);

    const isGrantedDelete = TC.permissions && TC.permissions.delete;

    return isActionCustom || isGrantedDelete ? (
        <div className={cn("flex flex-col w-40", className)}>
            <DeleteAction
                data={TC.selectRowsDatas.length > 1 ? TC.selectRowsDatas : TC.selectRowsDatas[0]}
                children={undefined}
                openDialog={runActionDelete}
                closeDialog={() => setRunActionDelete(false)}
            />
            <div className="flex items-center relative justify-center" ref={ref}>
                <button
                    onClick={() => {
                        if (Selected) {
                            if (Selected === "Delete") {
                                setRunActionDelete(true);
                            }
                            /* TC.setActionDialog({
                                    props: TC.tableBuilder.actions
                                        ? TC.tableBuilder.actions.find(
                                              (action) => action.component === Selected
                                          )?.props
                                        : {},
                                    open: true,
                                    component: Selected,
                                    isMultiple: true,
                                    isSingle: false,
                                }); */
                        }
                    }}
                    disabled={
                        !TC.loading && Selected && TC.selectRowsDatas.length > 0 ? false : true
                    }
                    type="submit"
                    className={cn(
                        "h-10 flex items-center text-muted-foreground bg-primary-foreground rounded-l-md border-l border-y",
                        !TC.loading &&
                            Selected &&
                            TC.selectRowsDatas.length > 0 &&
                            "bg-primary text-primary-foreground cursor-pointer border-primary"
                    )}
                >
                    <Play className="pointer-events-none mx-3" size={18} />
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"secondary"}
                            className={cn(
                                "w-full rounded-l-none rounded-r-md border border-border flex items-center justify-between"
                            )}
                        >
                            <div
                                className={cn(
                                    !selectedAction && "text-muted-foreground",
                                    "flex items-center justify-between overflow-hidden"
                                )}
                            >
                                {selectedAction ? (
                                    <div className="flex">
                                        <Icon name={selectedAction.icon} className="mr-2 h-4 w-4" />
                                        {selectedAction.label}
                                    </div>
                                ) : (
                                    "Action"
                                )}
                            </div>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        style={{
                            minWidth: ref?.current?.clientWidth ?? "200px",
                        }}
                    >
                        {/* @ts-ignore */}
                        {TC.tableBuilder.actions.map((action, index) =>
                            action.multiple ? (
                                <DropdownMenuItem
                                    onClick={() => {
                                        action.component && setSelected(action.component);
                                    }}
                                    key={index}
                                >
                                    <Icon name={action.icon} size={15} />
                                    <span className="ml-2">{action.label}</span>
                                </DropdownMenuItem>
                            ) : null
                        )}
                        <DropdownMenuItem
                            onClick={() => {
                                setSelected("Delete");
                            }}
                        >
                            <Trash size={15} />
                            <span className="ml-2">Supprimer</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    ) : null;
};
