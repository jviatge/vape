"use client";

import { cn } from "@vape/lib/utils";
import { LogOutIcon, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Configuration } from "./Configuration";

export const CardUser = ({
    firstName,
    lastName,
    role,
    open,
    versionApp,
    versionVape,
    listThemes,
}: {
    role: string;
    open?: boolean;
    firstName: string;
    lastName: string;
    versionApp: string;
    versionVape: string;
    listThemes: string[];
}) => {
    const [openConfig, setopenConfig] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                    <div className={"p-3 hover:bg-accent w-full"}>
                        <div className="relative text-grey-0">
                            <div>
                                <div className="flex text-sm rounded-full">
                                    <div className="block cursor-pointer w-full rounded-t text-left p12-m">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary transition text-primary-foreground">
                                                    <span className="p12-b tracking-tighter capitalize">
                                                        {firstName[0]}
                                                        {lastName[0]}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={cn(
                                                    "text-sm text-nowrap transition-all overflow-hidden",
                                                    open ? "w-full" : "w-0"
                                                )}
                                            >
                                                <div>
                                                    {firstName} {lastName}
                                                </div>
                                                <div className="text-muted-foreground italic">
                                                    {role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <button
                            onClick={() => setopenConfig(!openConfig)}
                            className={"flex items-center cursor-pointer w-full"}
                            type={"button"}
                        >
                            <Settings width={16} className={"mr-2"} />
                            <span>Configuration</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <button
                            onClick={() => signOut()}
                            className={"flex items-center cursor-pointer w-full"}
                        >
                            <LogOutIcon width={16} className={"mr-2"} />
                            <span>Logout</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* MODAL */}
            <Configuration
                open={openConfig}
                setOpen={setopenConfig}
                versionApp={versionApp}
                versionVape={versionVape}
                listThemes={listThemes}
            />
        </>
    );
};
