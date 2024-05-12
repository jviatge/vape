import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/lib/utils";
import { ChevronDown, Play } from "lucide-react";
import { useContext, useRef, useState } from "react";
import TableContext from "../context/Table.context";

export const Actions = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);
    const [Selected, setSelected] = useState<null | string>(null);

    const ref = useRef<HTMLDivElement>(null);

    const selectedAction = TC.tableBuilder?.actions?.find(
        (action) => action.component === Selected
    );

    return TC.tableBuilder.actions &&
        TC.tableBuilder.actions.length > 0 &&
        TC.tableBuilder.actions.some((action) => action.multiple) ? (
        <div className={cn("flex flex-col w-full", className)}>
            <div className="flex items-center relative w-full md:w-3/4" ref={ref}>
                <button
                    onClick={() => {
                        if (Selected) {
                            TC.setActionDialog({
                                props: TC.tableBuilder.actions
                                    ? TC.tableBuilder.actions.find(
                                          (action) => action.component === Selected
                                      )?.props
                                    : {},
                                open: true,
                                component: Selected,
                                isMultiple: true,
                                isSingle: false,
                            });
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
                                    "flex items-center justify-between"
                                )}
                            >
                                {selectedAction ? (
                                    <>
                                        <Icon name={selectedAction.icon} className="mr-2 h-4 w-4" />
                                        {selectedAction.label}
                                    </>
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
                        {TC.tableBuilder.actions.map((action, index) =>
                            action.multiple ? (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelected(action.component);
                                    }}
                                    key={index}
                                >
                                    <Icon name={action.icon} size={15} />
                                    <span className="ml-2">{action.label}</span>
                                </DropdownMenuItem>
                            ) : null
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    ) : (
        <div />
    );
};
