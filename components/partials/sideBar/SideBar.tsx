"use client";

import Icon from "@vape/components/Icon";
import { BurgerIcon } from "@vape/components/ui/BurgerIcon";
import { cn } from "@vape/lib/utils";
import { TypeLink } from "@vape/types/general";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { CardUser } from "./CardUser";

export const SideBar = ({
    links,
    firstName,
    lastName,
    role,
    version,
    listThemes,
}: {
    links: TypeLink[];
    firstName: string;
    lastName: string;
    role: string;
    open?: boolean;
    version: string;
    listThemes: string[];
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <aside className="sticky z-20 top-0 w-fit h-[calc(100vh)] md:block hidden">
                <Nav
                    links={links}
                    open={open}
                    setOpen={setOpen}
                    mobile={false}
                    firstName={firstName}
                    lastName={lastName}
                    version={version}
                    listThemes={listThemes}
                    role={role}
                />
            </aside>
            <div className="h-14 border-b w-[58px] border-0 bg-background md:hidden flex justify-center items-center relative border-r p-2">
                <BurgerIcon onClick={() => setOpen(!open)} isOpen={open} />
                <Nav
                    links={links}
                    open={open}
                    setOpen={setOpen}
                    mobile={true}
                    firstName={firstName}
                    lastName={lastName}
                    version={version}
                    listThemes={listThemes}
                    role={role}
                />
            </div>
        </>
    );
};

const Nav = ({
    links,
    open,
    setOpen,
    mobile,
    firstName,
    lastName,
    version,
    role,
    listThemes,
}: {
    links: TypeLink[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    mobile: boolean;
    firstName: string;
    lastName: string;
    version: string;
    role: string;
    listThemes: string[];
}) => {
    const width = {
        open: "max-w-[239px]",
        close: "max-w-[58px]",
    };

    const pathname = usePathname();
    return (
        <>
            <BackgroundVeil onClick={() => setOpen(false)} open={open} mobile={mobile} />
            <nav
                className={cn(
                    "flex shadow-xl z-40 bg-background",
                    mobile && "fixed h-full top-0 left-0"
                )}
            >
                <div
                    className={
                        "relative w-screen transition-all border-r border-grey-300 " +
                        (open ? width.open : mobile ? "max-w-[0px] border-none" : width.close)
                    }
                >
                    <div className={cn(mobile ? "pt-14" : "w-full")}>
                        {!mobile ? (
                            <CardUser
                                listThemes={listThemes}
                                version={version}
                                open={open}
                                firstName={firstName}
                                lastName={lastName}
                                role={role}
                            />
                        ) : null}
                        <div className="flex flex-col justify-between flex-shrink-0 flex-1 w-full">
                            <div className="overflow-y-auto text-grey-0 justify-between h-[calc(100vh-48px)]">
                                <div
                                    className={cn(
                                        "flex flex-col h-full",
                                        !mobile && "justify-between"
                                    )}
                                >
                                    {mobile ? (
                                        <CardUser
                                            listThemes={listThemes}
                                            open={open}
                                            firstName={firstName}
                                            lastName={lastName}
                                            role={role}
                                            version={version}
                                        />
                                    ) : null}
                                    <div
                                        className={cn(
                                            "flex flex-col gap-2",
                                            open ? "mx-4" : "mx-2"
                                        )}
                                    >
                                        <div className="flex flex-col gap-4 divide-y">
                                            <div
                                                className={cn(
                                                    "flex flex-col gap-1",
                                                    open ? "pt-2" : "pt-4"
                                                )}
                                            >
                                                {links.map(
                                                    ({ href, label, icon, separator }, index) => (
                                                        <div key={index}>
                                                            {separator && (
                                                                <div className="border-t border-0 my-2" />
                                                            )}
                                                            <NavItem
                                                                key={index}
                                                                href={href}
                                                                icon={icon}
                                                                open={open}
                                                                label={label}
                                                                pathname={pathname}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <div
                                                className={cn(
                                                    "flex flex-col gap-1",
                                                    open ? "pt-2" : "pt-4"
                                                )}
                                            ></div>
                                        </div>
                                    </div>

                                    {!mobile ? <ButtonOpen setOpen={setOpen} open={open} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

const NavItem = ({
    href,
    icon,
    open,
    label,
    pathname,
}: {
    href: string;
    icon: keyof typeof dynamicIconImports;
    open: boolean;
    label: string;
    pathname: string;
}) => {
    const buttonClass =
        "hover:bg-accent hover:text-accent-foreground relative select-none text-sm outline-none focus:bg-accent focus:text-accent-foreground flex items-center gap-2 px-2 rounded cursor-pointer transition py-2";

    return (
        <Link
            href={href}
            className={cn(
                buttonClass,
                "flex items-center gap-2 px-2 rounded text-muted-foreground cursor-pointer transition py-3",
                open ? "py-2" : "justify-center",
                "/" + pathname.split("/")[1] === href && "bg-accent text-accent-foreground"
            )}
        >
            <Icon name={icon} size={26} strokeWidth={1.4} className="h-5 w-5" />
            {open ? <div className="p14-r text-sm">{label}</div> : null}
        </Link>
    );
};

const ButtonOpen = ({ setOpen, open }: { setOpen: (open: boolean) => void; open: boolean }) => {
    const buttonClass =
        "hover:bg-accent hover:text-accent-foreground relative select-none text-sm outline-none focus:bg-accent focus:text-accent-foreground flex items-center gap-2 px-2 rounded cursor-pointer transition py-2";

    return (
        <div
            className={
                "text-grey-0 bottom-0 sticky bg-grey-700 w-full p-2 flex justify-end items-center mb-4"
            }
        >
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    buttonClass,
                    "cursor-pointer rounded flex justify-center items-center w-10 h-10"
                )}
            >
                {open ? (
                    <ChevronLeft size={26} strokeWidth={1.4} />
                ) : (
                    <ChevronRight size={26} strokeWidth={1.4} />
                )}
            </button>
        </div>
    );
};

const BackgroundVeil = ({
    open,
    mobile,
    onClick,
}: {
    open: boolean;
    mobile: boolean;
    onClick: () => void;
}) => {
    return mobile ? (
        <div
            onClick={onClick}
            className={cn(
                "absolute top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 z-[30]",
                open ? "block" : "hidden"
            )}
        ></div>
    ) : null;
};
