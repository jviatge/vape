"use client";

import { ResourceParams } from "@vape/types/resources.type";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { CancelButtonRsc } from "../ui/CancelButtonRsc";
import { Button } from "../ui/button";

export const LayoutRsc = ({
    children,
    params,
    idRsc,
    isDashboard,
}: {
    isDashboard?: boolean;
    children: React.ReactNode;
    params: ResourceParams;
    idRsc?: string;
}) => {
    const pathname = usePathname();

    const getLastPath = (pathname: string) => {
        const paths = pathname.split("/");
        return paths[paths.length - 1];
    };

    /* console.log("LayoutRsc", idRsc, params); */

    return (
        <div
            className="overflow-y-auto overflow-x-hidden relative md:translate-x-0 -translate-x-[58px] w-screen md:w-full"
            style={{ height: "calc(100vh - 56px)" }}
        >
            <div className="md:p-8 p-4">
                <div className="flex items-center mb-5 justify-between">
                    <div className="flex items-center">
                        <Icon name={params.icon} size={28} strokeWidth={1.6} className="mr-3" />
                        <h1 className="font-semibold text-3xl">{params.label}</h1>
                    </div>

                    {isDashboard ? null : (
                        <>
                            {/* INDEX */}
                            {getLastPath(pathname) === idRsc && !params.disabledCreate ? (
                                <Link href={`${pathname}/+`}>
                                    <Button>
                                        <Plus size={24} strokeWidth={1.6} />
                                    </Button>
                                </Link>
                            ) : null}

                            {/* CREATE */}
                            {getLastPath(pathname) === "+" ? (
                                <>
                                    <CancelButtonRsc type={"close"} />
                                </>
                            ) : null}

                            {/* UPDATE */}
                            {getLastPath(pathname) !== "+" && getLastPath(pathname) !== idRsc ? (
                                <>
                                    <CancelButtonRsc type={"close"} />
                                </>
                            ) : null}
                        </>
                    )}
                </div>

                <main className="space-y-4">{children}</main>
            </div>
        </div>
    );
};
