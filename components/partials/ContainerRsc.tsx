"use client";

import { ResourceParams } from "@vape/types/resources.type";
import Icon from "../Icon";

export const ContainerRsc = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: ResourceParams;
}) => {
    return (
        <div className="overflow-auto relative" style={{ height: "calc(100vh - 56px)" }}>
            <div className="p-10">
                <div className="flex items-center mb-5">
                    <Icon name={params.icon} size={28} strokeWidth={1.6} className="mr-3" />
                    <h1 className="font-semibold text-3xl">{params.label}</h1>
                </div>

                <main className="space-y-4">{children}</main>
            </div>
        </div>
    );
};
