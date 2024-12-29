"use clients";

import { Card } from "@/components/ui/card";

export const ColorTest = () => {
    return (
        <div className={"container-page grid grid-cols-2 gap-4"}>
            <Card className={"p-4 col-span-2"}>
                <ul>
                    <li className={"flex items-center"}>
                        <div className={"border bg-primary h-5 w-5"} />
                        <span className={"ml-2"}>primary</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-background h-5 w-5"} />
                        <span className={"ml-2"}>primary-foreground</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-secondary h-5 w-5"} />
                        <span className={"ml-2"}>secondary</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-secondary-foreground h-5 w-5"} />
                        <span className={"ml-2"}>secondary-foreground</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-muted h-5 w-5"} />
                        <span className={"ml-2"}>muted</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-muted-foreground h-5 w-5"} />
                        <span className={"ml-2"}>muted-foreground</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-destructive h-5 w-5"} />
                        <span className={"ml-2"}>destructive</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-destructive-foreground h-5 w-5"} />
                        <span className={"ml-2"}>destructive-foreground</span>
                    </li>
                    <li>--------------</li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-accent h-5 w-5"} />
                        <span className={"ml-2"}>accent</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-accent-foreground h-5 w-5"} />
                        <span className={"ml-2"}>accent-foreground</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-popover h-5 w-5"} />
                        <span className={"ml-2"}>popover</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-popover-foreground h-5 w-5"} />
                        <span className={"ml-2"}>popover-foreground</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-card h-5 w-5"} />
                        <span className={"ml-2"}>card</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-card-foreground h-5 w-5"} />
                        <span className={"ml-2"}>card-foreground</span>
                    </li>
                    <li>--------------</li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-border h-5 w-5"} />
                        <span className={"ml-2"}>border</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-input h-5 w-5"} />
                        <span className={"ml-2"}>input</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-ring h-5 w-5"} />
                        <span className={"ml-2"}>ring</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-background h-5 w-5"} />
                        <span className={"ml-2"}>background</span>
                    </li>
                    <li className={"flex items-center"}>
                        <div className={"border bg-foreground h-5 w-5"} />
                        <span className={"ml-2"}>foreground</span>
                    </li>
                </ul>
            </Card>
        </div>
    );
};
