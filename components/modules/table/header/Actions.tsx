import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@vape/components/Icon";
import { Button } from "@vape/components/ui/button";
import { cn } from "@vape/lib/utils";
import { ActionProps } from "@vape/types/modules/table";
import { ArchiveRestore, ChevronDown, Play, Trash } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import FormModule from "../../form/Form.module";
import { DeleteAction } from "../actions/Delete";
import { RestoreAction } from "../actions/Restore";
import TableContext from "../context/Table.context";
import { resolveIDs } from "../utils/ids";

export const Actions = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);
    const [Selected, setSelected] = useState<null | string>(null);
    const [runActionDelete, setRunActionDelete] = useState<boolean>(false);
    const [runActionRestore, setRunActionRestore] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [action, setAcion] = useState<ActionProps>();

    const ref = useRef<HTMLDivElement>(null);

    const selectedAction: any =
        Selected === "Delete"
            ? {
                  label: "Supprimer",
                  icon: "trash",
                  single: true,
              }
            : Selected === "Restore"
            ? {
                  label: "Restaurer",
                  icon: "archive-restore",
                  single: true,
              }
            : TC.tableBuilder?.actions?.find((action) => {
                  return action.name === Selected;
              });

    const isActionCustom =
        TC.tableBuilder.actions &&
        TC.tableBuilder.actions.length > 0 &&
        TC.tableBuilder.actions.some((action) => action.multiple);

    const isGrantedDelete = TC.permissions && TC.permissions.delete;

    useEffect(() => {
        if (TC.tableBuilder.actions) {
            const action = TC.tableBuilder.actions.find((action) => action.name === Selected);
            setAcion(action);
        }
        return () => {};
    }, [Selected]);

    const getIds = () => {
        return resolveIDs(
            TC.selectRowsDatas.length > 1 ? TC.selectRowsDatas : TC.selectRowsDatas[0]
        );
    };

    return isActionCustom || isGrantedDelete ? (
        <div className={cn("flex flex-col w-40", className)}>
            {isGrantedDelete ? (
                <>
                    <DeleteAction
                        data={
                            TC.selectRowsDatas.length > 1
                                ? TC.selectRowsDatas
                                : TC.selectRowsDatas[0]
                        }
                        openDialog={runActionDelete}
                        closeDialog={() => {
                            console.log("setRunActionDelete(false)");
                        }}
                    >
                        <></>
                    </DeleteAction>
                    <RestoreAction
                        data={
                            TC.selectRowsDatas.length > 1
                                ? TC.selectRowsDatas
                                : TC.selectRowsDatas[0]
                        }
                        openDialog={runActionRestore}
                        closeDialog={() => {
                            console.log("setRunActionRestore(false)}");
                        }}
                    >
                        <></>
                    </RestoreAction>
                </>
            ) : null}

            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{action?.title}</DialogTitle>
                        {action?.description ? (
                            <DialogDescription>{action.description}</DialogDescription>
                        ) : null}
                    </DialogHeader>
                    {action?.form ? (
                        <FormModule
                            ids={getIds()}
                            formBuilder={action.form}
                            data={{}}
                            cancelCallback={() => setOpen(false)}
                            onSuccesSubmit={() => setOpen(false)}
                        />
                    ) : null}
                </DialogContent>
            </Dialog>

            <div className="flex items-center relative justify-center" ref={ref}>
                <button
                    onClick={() => {
                        if (Selected) {
                            if (Selected === "Delete") {
                                setRunActionDelete(true);
                            } else if (Selected === "Restore") {
                                setRunActionRestore(true);
                            } else {
                                setOpen(true);
                            }
                        }
                    }}
                    disabled={
                        !TC.loading && Selected && TC.selectRowsDatas.length > 0 ? false : true
                    }
                    type="submit"
                    className={cn(
                        "h-10 flex items-center text-muted-foreground bg-background rounded-l-md border-l border-y",
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
                                    /* !selectedAction && "text-accent", */
                                    "flex items-center justify-between overflow-hidden"
                                )}
                            >
                                {Selected ? (
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
                        {/* @ts-ignore */}
                        {TC.tableBuilder.actions.map((action, index) =>
                            action.multiple ? (
                                <DropdownMenuItem
                                    onClick={() => setSelected(action.name)}
                                    key={index}
                                >
                                    <Icon name={action.icon} size={15} />
                                    <span className="ml-2">{action.label}</span>
                                </DropdownMenuItem>
                            ) : null
                        )}
                        {isGrantedDelete ? (
                            <>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelected("Delete");
                                    }}
                                >
                                    <Trash size={15} />
                                    <span className="ml-2">Supprimer</span>
                                </DropdownMenuItem>
                                {TC.modeTrash ? (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelected("Restore");
                                        }}
                                    >
                                        <ArchiveRestore size={15} />
                                        <span className="ml-2">Restaurer</span>
                                    </DropdownMenuItem>
                                ) : null}
                            </>
                        ) : null}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    ) : null;
};
