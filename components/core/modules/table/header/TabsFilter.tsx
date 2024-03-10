import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import TablesContext from "../context/Table.context";

export const TabsFilter = () => {
    const TC = useContext(TablesContext);
    return Array.isArray(TC.tableBuilder.get) ? (
        <Tabs
            defaultValue={TC.get}
            className="w-[400px]"
            onValueChange={(value: string) => TC.setGet(value)}
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
