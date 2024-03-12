"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    CalendarIcon,
    Mail,
    RocketIcon,
    ScanFace,
    Search,
    Settings,
    User2Icon,
} from "lucide-react";
import { useState } from "react";

export function CommandBar() {
    const [open, setOpen] = useState(false);
    return (
        <div className={"w-full md:w-1/3 flex justify-center items-center mx-3"}>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <ScanFace className="mr-2 h-4 w-4" />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <RocketIcon className="mr-2 h-4 w-4" />
                            <span>Launch</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User2Icon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Mail</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
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
