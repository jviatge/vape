"use client";

import { ResourceParams } from "@vape/types/resources.type";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { TransitionProvider } from "../providers/TransitionProvider";
import { CancelButtonRsc } from "../ui/CancelButtonRsc";
import { Button } from "../ui/button";

export const LayoutRsc = ({
    children,
    params,
    idRsc,
    isDashboard,
    isDocumentation,
}: {
    isDashboard?: boolean;
    children: React.ReactNode;
    params: ResourceParams;
    idRsc?: string;
    isDocumentation?: boolean;
}) => {
    const pathname = usePathname();

    const getLastPath = (pathname: string) => {
        const paths = pathname.split("/");
        return paths[paths.length - 1];
    };

    return (
        <div
            className="overflow-y-auto overflow-x-hidden relative md:translate-x-0 -translate-x-[58px] w-screen md:w-full"
            style={{ height: "calc(100vh - 56px)" }}
        >
            <div className="md:p-8 p-4">
                {!isDocumentation ? (
                    <div className="flex items-center mb-5 justify-between">
                        <TransitionProvider className="flex items-center" type="left-right">
                            <div className="relative h-10 w-12">
                                <Icon
                                    name={params.icon}
                                    size={28}
                                    strokeWidth={1.6}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </div>
                            <h1 className="font-semibold text-3xl">{params.label}</h1>
                        </TransitionProvider>

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
                                {getLastPath(pathname) !== "+" &&
                                getLastPath(pathname) !== idRsc ? (
                                    <>
                                        <CancelButtonRsc type={"close"} />
                                    </>
                                ) : null}
                            </>
                        )}
                    </div>
                ) : null}

                <main className="space-y-4">{children}</main>
            </div>
        </div>
    );
};
