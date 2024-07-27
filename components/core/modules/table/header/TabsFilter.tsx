import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@vape/lib/utils";
import { useContext } from "react";
import TableContext from "../context/Table.context";

export const TabsFilter = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);

    const hanldeOnValueChange = (value: string) => {
        TC.setSelectRowsDatas([]);
        TC.setQueryValue("get", "add", undefined, value);
    };

    const defaultValue =
        TC.tableBuilder.get && Array.isArray(TC.tableBuilder.get)
            ? TC.tableBuilder.get.filter((v) => v?.default)[0]?.get
                ? TC.tableBuilder.get.filter((v) => v?.default)[0].get
                : TC.tableBuilder.get[0].get
            : TC.query.get ?? undefined;

    return Array.isArray(TC.tableBuilder.get) ? (
        <Tabs
            defaultValue={defaultValue}
            className={cn(className)}
            onValueChange={hanldeOnValueChange}
        >
            <TabsList className="border w-full">
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
