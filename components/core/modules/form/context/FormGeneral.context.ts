import { TableBuilder } from "@vape/types/modules/table/table";
import { Dispatch, SetStateAction, createContext } from "react";
import { FormBuilder } from "../Form.module";

export type ModalProps = {
    open: "create" | "select" | "edit" | null;
    id?: string;
    data?: Record<string, any>[] | Record<string, any>;
    tableBuilder?: TableBuilder;
    formBuilder?: FormBuilder;
};

export type FormGeneralContext = {
    modal: ModalProps;
    setModal: Dispatch<SetStateAction<ModalProps>>;
    mode: "create" | "edit";
};

export default createContext<FormGeneralContext>({} as FormGeneralContext);
