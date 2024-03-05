"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "../Icon";

export const SideBar = ({
    links,
    logo,
}: {
    links: {
        href: string;
        label: string;
        separator?: boolean;
        icon: keyof typeof dynamicIconImports;
    }[];
    logo: StaticImageData;
}) => {
    const [minBar, setMinBar] = useState(true);
    const pathname = usePathname();

    return (
        <>
            <div
                style={{ width: minBar ? "4rem" : "12rem" }}
                className="h-full border-r border-0 flex flex-col items-center bg-primary-foreground z-40"
            >
                <div className="rounded w-full h-14 p-2 flex justify-center items-center dark:text-primary-foreground">
                    <Image src={logo.src} alt="logo" className="w-full h-auto" />
                </div>

                <div className="h-full flex flex-col justify-between pt-2">
                    <div className="space-y-2">
                        <Link
                            href="/dashboard"
                            className={cn(
                                "cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card",
                                "/" + pathname.split("/")[1] === "/dashboard" &&
                                    "bg-card text-destructive-foreground"
                            )}
                        >
                            <Icon name="home" size={26} strokeWidth={1.4} />
                        </Link>

                        <div className="border-t border-0" />

                        {links.map(({ href, label, icon, separator }, index) => (
                            <div key={index}>
                                {separator && <div className="border-t border-0 mb-2" />}
                                <Link
                                    href={href}
                                    className={cn(
                                        "cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card",
                                        "/" + pathname.split("/")[1] === href &&
                                            "bg-card text-destructive-foreground"
                                    )}
                                >
                                    <Icon name={icon} size={26} strokeWidth={1.4} />
                                </Link>
                            </div>
                        ))}

                        <div className="border-t border-0" />

                        <Link
                            href="/documentation"
                            className={cn(
                                "cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card",
                                "/" + pathname.split("/")[1] === "/documentation" &&
                                    "bg-card text-destructive-foreground"
                            )}
                        >
                            <Icon name="book-open" size={26} strokeWidth={1.4} />
                        </Link>
                    </div>

                    <div
                        onClick={() => setMinBar(!minBar)}
                        className="cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card"
                    >
                        {minBar ? (
                            <ChevronRight size={26} strokeWidth={1.4} />
                        ) : (
                            <ChevronLeft size={26} strokeWidth={1.4} />
                        )}
                    </div>
                </div>
            </div>

            {!minBar && <div className="absolute h-full w-full bg-black z-30 opacity-50" />}
        </>
    );
};
