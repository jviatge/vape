import { useQuery } from "@tanstack/react-query";
import { queryGetByModuleAndId } from "@vape/actions/queries";
import TableModule from "@vape/components/core/modules/table/Table.module";
import { Button } from "@vape/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@vape/components/ui/dialog";
import { Loading } from "@vape/tools";
import { Dispatch, SetStateAction, useState } from "react";
import FormModule, { FormBuilder } from "../Form.module";
import FormGeneralContext, { ModalProps } from "./FormGeneral.context";

export const FormGeneralProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: {
        mode: "create" | "edit";
        authUser?: Record<string, any>;
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
                modal,
                setModal,
            }}
        >
            {children}
            <ModalForm modal={modal} setModal={setModal} />
            <ModalSelect modal={modal} setModal={setModal} />
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
    const GetData = ({ formBuilder, id }: { formBuilder: FormBuilder; id: string }) => {
        const { data, isLoading } = useQuery<any, Error, Record<string, any>>({
            queryKey: [formBuilder.model, id],
            queryFn: () =>
                queryGetByModuleAndId({
                    model: formBuilder.model,
                    get: formBuilder.get as string,
                    id: id,
                }),
        });

        return isLoading ? (
            <div className="w-full flex justify-center py-10">
                <Loading />
            </div>
        ) : data ? (
            <FormModule
                data={data.data}
                id={id}
                formBuilder={formBuilder}
                submitButtonOutID={"edit-" + formBuilder.model}
                onSuccesSubmit={(data: any) =>
                    setModal((prev) => ({
                        ...prev,
                        open: null,
                        data: {
                            [modal.name]: data,
                        },
                    }))
                }
            />
        ) : null;
    };

    return modal.formBuilder ? (
        <Dialog
            open={modal.open === "create" || modal.open === "edit"}
            onOpenChange={() => setModal((prev) => ({ ...prev, open: null }))}
        >
            {/* sm:max-w-[80vw] max-h-[95vh] */}
            <DialogContent className="sm:max-w-[80vw] w-full max-h-[95vh]">
                <DialogHeader>
                    <DialogTitle className="pb-6">Ajouter</DialogTitle>
                    <div className={"overflow-y-scroll max-h-[70vh] px-4"}>
                        {modal.formBuilder && modal.id ? (
                            <GetData formBuilder={modal.formBuilder} id={modal.id} />
                        ) : (
                            <FormModule
                                data={{}}
                                formBuilder={modal.formBuilder}
                                submitButtonOutID={"create-" + modal.formBuilder.model}
                                onSuccesSubmit={(data: any) =>
                                    setModal((prev) => ({
                                        ...prev,
                                        open: null,
                                        data: {
                                            [modal.name]: data,
                                        },
                                    }))
                                }
                            />
                        )}
                    </div>
                </DialogHeader>
                <DialogFooter>
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
            <DialogContent className="sm:max-w-[80vw] w-full max-h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle className="pb-6">Sélectionner</DialogTitle>
                    <div className={"overflow-y-scroll max-h-[70vh] space-y-4"}>
                        <TableModule
                            onChangeSelect={(data) => setData(data)}
                            modeSelect={"single"}
                            tableBuilder={modal.tableBuilder}
                            permissions={{
                                read: true,
                                create: false,
                                update: false,
                            }}
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
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
