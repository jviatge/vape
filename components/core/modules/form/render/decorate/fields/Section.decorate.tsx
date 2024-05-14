import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Col, resolveColumnsClass } from "@/lib/resolveGrid";
import { useState } from "react";
import { RenderFields } from "../../RenderFields";
import { FieldBuilder } from "../../renderFields.type";
import { BaseDecorate } from "../DecorateRender.type";

export interface DecorateSectionProps extends BaseDecorate {
    type: "sections";
    tabs: {
        label: string;
        name: string;
        description?: string;
        disabled?: boolean;
        fields: FieldBuilder[];
    }[];
}

const SectionsDecorate = ({ tabs, col, gap, data, onlyRead }: DecorateSectionProps) => {
    const [tabActivated, setTabActivated] = useState<string>(tabs[0].name);

    /* useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const tab = tabs.find((tab) => tab.name === hash.replace("#", ""));
            if (tab) {
                setTabActivated(tab.name);
            }
        }
    }, [tabs]); */

    return (
        <Tabs value={tabActivated} className="w-full">
            <TabsList
                className={
                    "w-full grid-cols-3 border " + resolveColumnsClass(tabs.length as Col, 1)
                }
            >
                {tabs.map((tab, index) => {
                    return (
                        <TabsTrigger
                            disabled={tab.disabled}
                            /*onClick={() => window.location.hash = '#' + tab.name}*/
                            onClick={() => setTabActivated(tab.name)}
                            key={index}
                            value={tab.name}
                        >
                            {tab.label}
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {tabs.map((tab, index) => {
                return (
                    <TabsContent key={index} value={tab.name}>
                        <Card className="w-full p-3 bg-transparent space-y-4 grid">
                            <CardHeader>
                                <CardTitle>{tab.label}</CardTitle>
                                {tab.description ? (
                                    <CardDescription>{tab.description}</CardDescription>
                                ) : null}
                            </CardHeader>
                            <CardContent>
                                <div className={resolveColumnsClass(col ?? 4, gap ?? 5) + " gap-6"}>
                                    <RenderFields
                                        fields={tab.fields}
                                        data={data}
                                        onlyRead={onlyRead}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};

export { SectionsDecorate };
