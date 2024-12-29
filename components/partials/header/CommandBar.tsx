"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { TypeLink } from "@vape/types/general";
import { Plus, Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "../../Icon";

export function CommandBar({ links }: { links: TypeLink[] }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <div className={"w-full md:w-1/3 flex justify-center items-center mx-3"}>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Tapez une commande ou effectuez une recherche..." />
                <CommandList>
                    <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                    <CommandGroup heading="Ressources">
                        {links.map((link, index) => (
                            <CommandItem
                                key={index}
                                className="cursor-pointer"
                                onSelect={() => {
                                    router.push(link.href);
                                    setOpen(false);
                                }}
                            >
                                <Icon name={link.icon} className="mr-2 h-4 w-4" />
                                <span>{link.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Actions">
                        {links.map((link, index) =>
                            link.href === "/dashboard" || link.disabledCreate ? null : (
                                <CommandItem
                                    key={"+" + index}
                                    className="cursor-pointer"
                                    onSelect={() => {
                                        router.push(link.href + "/+");
                                        setOpen(false);
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    <span>Ajout {link.label}</span>
                                </CommandItem>
                            )
                        )}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
            <div className={"relative w-full h-full"}>
                <div
                    className={
                        "h-10 w-full cursor-pointer z-50 hover:hover:bg-muted/70 flex items-center px-4 rounded-md text-muted-foreground border-offset-background border"
                    }
                    onClick={() => setOpen((open: boolean) => !open)}
                >
                    <Search className={"h-5 w-5"} />
                    <span className={"ml-2 text-sm"}>Recherche / actions ⌘k</span>
                </div>
            </div>
        </div>
    );
}
