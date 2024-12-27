import { FormBuilder } from "@vape/types/modules/form/form";
import { TableBuilder } from "@vape/types/modules/table/table";
import { Dispatch, SetStateAction, createContext } from "react";

export type ModalProps = {
    open: "create" | "select" | "edit" | null;
    id?: string;
    data?: Record<string, any>;
    tableBuilder?: TableBuilder;
    formBuilder?: FormBuilder;
    valueParent?: Record<string, any>;
    name: string;
};

export type FormGeneralContext = {
    modal: ModalProps;
    setModal: Dispatch<SetStateAction<ModalProps>>;
    mode: "create" | "edit";
    authUser?: Record<string, any>;
    extraData?: Record<string, any>;
    data?: Record<string, any>;
};

export default createContext<FormGeneralContext>({} as FormGeneralContext);
