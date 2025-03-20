import { Button } from "@vape/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@vape/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import TableModule from "../../table/Table.module";
import FormModule from "../Form.module";
import FormGeneralContext, { ModalProps } from "./FormGeneral.context";

export const FormGeneralProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: {
        extraData?: Record<string, any>;
        mode: "create" | "edit";
        authUser?: Record<string, any>;
        data?: Record<string, any>;
    };
}) => {
    const [modal, setModal] = useState<ModalProps>({
        name: "",
        open: null,
    });

    return (
        <FormGeneralContext.Provider
            value={{
                mode: value.mode,
                authUser: value.authUser,
                extraData: value.extraData,
                data: value.data,
                modal,
                setModal,
            }}
        >
            <>
                {children}
                <ModalForm modal={modal} setModal={setModal} />
                <ModalSelect modal={modal} setModal={setModal} />
            </>
        </FormGeneralContext.Provider>
    );
};

const ModalForm = ({
    modal,
    setModal,
}: {
    modal: ModalProps;
    setModal: Dispatch<SetStateAction<ModalProps>>;
}) => {
    return modal.formBuilder ? (
        <Dialog open={modal.open === "create" || modal.open === "edit"}>
            <DialogContent
                tabIndex={undefined}
                className="sm:max-w-[80vw] w-full max-h-[95vh] modal-relation"
            >
                <DialogHeader>
                    <DialogTitle className="pb-6">Ajouter</DialogTitle>
                    <div className={"overflow-y-scroll max-h-[70vh] px-4"}>
                        <FormModule
                            id={modal.id}
                            extraData={modal.valueParent}
                            formBuilder={modal.formBuilder}
                            submitButtonOutID={
                                (modal.id ? "edit-" : "create-") + modal.formBuilder.model
                            }
                            disabledLeaveConfirmation={true}
                            onSuccesSubmit={(data: any) => {
                                setModal((prev) => ({
                                    ...prev,
                                    open: null,
                                    data: {
                                        [modal.name]: data,
                                    },
                                }));
                            }}
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        type="button"
                        onClick={() => setModal((prev) => ({ ...prev, open: null }))}
                    >
                        Annuler
                    </Button>
                    <Button
                        form={(modal.id ? "edit-" : "create-") + modal.formBuilder.model}
                        type={"submit"}
                    >
                        {modal.id ? "Modifier" : "Créer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ) : null;
};

const ModalSelect = ({
    modal,
    setModal,
}: {
    modal: ModalProps;
    setModal: Dispatch<SetStateAction<ModalProps>>;
}) => {
    const [data, setData] = useState<Record<string, any>[]>([]);

    return modal.tableBuilder ? (
        <Dialog
            open={modal.open === "select"}
            onOpenChange={() => setModal((prev) => ({ ...prev, open: null }))}
        >
            {/* sm:max-w-[80vw] max-h-[95vh] */}
            <DialogContent
                tabIndex={undefined}
                className="sm:max-w-[80vw] w-full max-h-[95vh] overflow-scroll"
            >
                <DialogHeader>
                    <DialogTitle className="pb-6">Sélectionner</DialogTitle>
                    <div className={"overflow-y-scroll max-h-[70vh] space-y-4"}>
                        <TableModule
                            onChangeSelect={(data) => setData(data)}
                            modeSelect={"single"}
                            tableBuilder={modal.tableBuilder}
                            permissions={{
                                delete: false,
                                read: true,
                                create: false,
                                update: false,
                            }}
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        type="button"
                        onClick={() => setModal((prev) => ({ ...prev, open: null }))}
                    >
                        Annuler
                    </Button>
                    <Button
                        disabled={data.length === 0}
                        type="button"
                        onClick={() => {
                            setModal((prev) => ({
                                ...prev,
                                open: null,
                                data: {
                                    [modal.name]: data,
                                },
                            }));
                        }}
                    >
                        Validé
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ) : null;
};
