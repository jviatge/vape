"use client";

import { ResourceParams } from "@vape/types/resources.type";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { Button } from "../ui/button";

export const LayoutRsc = ({
    children,
    params,
    idRsc,
    disabledCreate,
}: {
    children: React.ReactNode;
    params: ResourceParams;
    idRsc?: string;
    disabledCreate?: boolean;
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

                    {/* INDEX */}
                    {getLastPath(pathname) === idRsc ? (
                        <Link href={`${pathname}/+`}>
                            <Button>
                                <Plus size={24} strokeWidth={1.6} />
                            </Button>
                        </Link>
                    ) : null}

                    {/* CREATE */}
                    {getLastPath(pathname) === "+" ? (
                        <>
                            <CancelButton />
                        </>
                    ) : null}

                    {/* UPDATE */}
                    {getLastPath(pathname) !== "+" && getLastPath(pathname) !== idRsc ? (
                        <>
                            <CancelButton />
                        </>
                    ) : null}
                </div>

                <main className="space-y-4">{children}</main>
            </div>
        </div>
    );
};

const CancelButton = () => {
    const pathname = usePathname();
    const genLinkBack = () => {
        const paths = pathname.split("/");
        paths.pop();
        console.log("genLinkBack", paths.join("/"));
        return paths.join("/");
    };

    return (
        <Link
            href={genLinkBack()}
            className="cursor-pointer rounded flex justify-center items-center w-11 h-11 text-destructive-foreground hover:bg-card border"
        >
            <X size={24} strokeWidth={1.6} />
        </Link>
    );
};
