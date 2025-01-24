import { useContext } from "react";
import FormGeneralContext from "../context/FormGeneral.context";

export const useFormGeneral = () => {
    return useContext(FormGeneralContext);
};
