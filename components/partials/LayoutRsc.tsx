"use client";

import { ResourceParams } from "@vape/types/resources.type";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon";
import { Button } from "../ui/button";

export const LayoutRsc = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: ResourceParams;
}) => {
    const pathname = usePathname();

    const getLastPath = (pathname: string) => {
        const paths = pathname.split("/");
        return paths[paths.length - 1];
    };

    return (
        <div className="overflow-auto relative" style={{ height: "calc(100vh - 56px)" }}>
            <div className="p-10 ">
                <div className="flex items-center mb-5 justify-between">
                    <div className="flex items-center">
                        <Icon name={params.icon} size={28} strokeWidth={1.6} className="mr-3" />
                        <h1 className="font-semibold text-3xl">{params.label}</h1>
                    </div>

                    {getLastPath(pathname) !== "+" ? (
                        <Link href={`${pathname}/+`}>
                            <Button>
                                <Plus size={24} strokeWidth={1.6} />
                            </Button>
                        </Link>
                    ) : null}
                </div>

                <main className="space-y-4">{children}</main>
            </div>
        </div>
    );
};
