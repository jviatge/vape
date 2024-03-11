import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect } from "react";
import TableContext from "../context/Table.context";
import useParamsTable from "../hook/useParamsTable";

export const TabsFilter = () => {
    const TC = useContext(TableContext);
    const { set, get } = useParamsTable("tab-filter");

    useEffect(() => {
        get() && TC.setGet(get());
        return () => {};
    }, []);

    const hanldeOnValueChange = (value: string) => {
        set(value);
        TC.setGet(value);
    };

    return Array.isArray(TC.tableBuilder.get) ? (
        <Tabs
            defaultValue={get() !== "" ? get() : TC.tableBuilder.get[0].get}
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
