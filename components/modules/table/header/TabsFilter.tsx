import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect } from "react";
import TableContext from "../context/Table.context";

export const TabsFilter = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);

    const getValueDefault = () => {
        return TC.tableBuilder.get && Array.isArray(TC.tableBuilder.get)
            ? TC.tableBuilder.get.filter((v) => v?.default)[0]?.get
                ? TC.tableBuilder.get.filter((v) => v?.default)[0].get
                : TC.tableBuilder.get[0].get
            : TC.tableBuilder.get ?? TC.query.get ?? "undefined";
    };

    useEffect(() => {
        TC.setTabValue(getValueDefault());
    }, []);

    const isTabs = Array.isArray(TC.tableBuilder.get);

    const hanldeOnValueChange = (value: string) => {
        TC.setSelectRowsDatas([]);
        TC.setModeTrash(false);
        TC.setTabValue(value);
        TC.setQueryValue("get", "add", undefined, value);
    };

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

    return Array.isArray(TC.tableBuilder.get) ? (
        <Tabs value={TC.tabValue} className={"w-full md:w-1/4"} onValueChange={hanldeOnValueChange}>
            <TabsList className="border w-full">
                <TabsTrigger className="hidden" key={"undefined"} value={"undefined"} />
                {TC.tableBuilder.get.map((tab) => {
                    return (
                        <TabsTrigger className="w-full" key={tab.get} value={tab.get}>
                            {tab.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    ) : null;
};
