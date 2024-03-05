import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabsFilter = () => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="border">
                <TabsTrigger value="account">Aujourd'hui</TabsTrigger>
                <TabsTrigger value="password">Tous</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};
