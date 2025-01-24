import { Button } from "@/components/ui/button";
import { InfosHover } from "@/components/ui/infos-hover";
import { Trash } from "lucide-react";
import React, { useContext } from "react";
import TableContext from "../context/Table.context";

export const TrashMode = () => {
    const TC = useContext(TableContext);

    const getValueDefault = () => {
        return TC.tableBuilder.get && Array.isArray(TC.tableBuilder.get)
            ? TC.tableBuilder.get.filter((v) => v?.default)[0]?.get
                ? TC.tableBuilder.get.filter((v) => v?.default)[0].get
                : TC.tableBuilder.get[0].get
            : TC.tableBuilder.get ?? TC.query.get ?? "undefined";
    };

    const isTabs = Array.isArray(TC.tableBuilder.get);

    const handleTrash = () => {
        TC.setSelectRowsDatas([]);
        if (!TC.modeTrash) {
            TC.setQueryValue("get", "add", undefined, "trash");
            TC.setTabValue("undefined");
            TC.setModeTrash(true);
        } else {
            const getTabValue = getValueDefault();
            if (isTabs) {
                TC.setTabValue(getTabValue);
                TC.setQueryValue("get", "add", undefined, getTabValue);
                TC.setModeTrash(false);
            } else {
                TC.setQueryValue("get", "add", undefined, getTabValue);
                TC.setModeTrash(false);
            }
        }
    };

    return TC.permissions?.delete ? (
        <InfosHover message={"Corbeilles"}>
            <Button
                variant={TC.modeTrash ? "destructive" : "secondary"}
                className="border"
                type="button"
                onClick={handleTrash}
            >
                <Trash className="pointer-events-none" size={18} />
            </Button>
        </InfosHover>
    ) : null;
};
