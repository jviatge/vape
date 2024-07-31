import { Button } from "@/components/ui/button";
import { InfosHover } from "@/components/ui/infos-hover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@vape/tools";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
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

    const [tabValue, setTabValue] = useState<string | undefined>(getValueDefault());

    const isTabs = Array.isArray(TC.tableBuilder.get);

    const hanldeOnValueChange = (value: string) => {
        TC.setSelectRowsDatas([]);
        TC.setModeTrash(false);
        setTabValue(value);
        TC.setQueryValue("get", "add", undefined, value);
    };

    const handleTrash = () => {
        TC.setSelectRowsDatas([]);
        if (!TC.modeTrash) {
            TC.setQueryValue("get", "add", undefined, "trash");
            setTabValue("undefined");
            TC.setModeTrash(true);
        } else {
            const getTabValue = getValueDefault();
            if (isTabs) {
                setTabValue(getTabValue);
                TC.setQueryValue("get", "add", undefined, getTabValue);
                TC.setModeTrash(false);
            } else {
                TC.setQueryValue("get", "add", undefined, getTabValue);
                TC.setModeTrash(false);
            }
        }
    };

    return (
        <div
            className={cn(
                "flex items-center justify-between md:justify-start space-x-3 w-full pr-4",
                className
            )}
        >
            {Array.isArray(TC.tableBuilder.get) ? (
                <Tabs value={tabValue} className={"w-full"} onValueChange={hanldeOnValueChange}>
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
            ) : null}
            {TC.permissions?.delete ? (
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
            ) : null}
        </div>
    );
};
