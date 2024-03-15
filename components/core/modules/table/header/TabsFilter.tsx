import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import TableContext from "../context/Table.context";

export const TabsFilter = () => {
    const TC = useContext(TableContext);

    const hanldeOnValueChange = (value: string) => {
        TC.setQueryValue("get", "add", undefined, value);
    };

    return Array.isArray(TC.tableBuilder.get) ? (
        <Tabs
            defaultValue={TC.query.get ?? TC.tableBuilder.get[0].get}
            className="w-[400px]"
            onValueChange={hanldeOnValueChange}
        >
            <TabsList className="border">
                {TC.tableBuilder.get.map((tab) => {
                    return (
                        <TabsTrigger key={tab.get} value={tab.get}>
                            {tab.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
        </Tabs>
    ) : null;
};
