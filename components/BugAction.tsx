"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bug } from "lucide-react";
import { useState } from "react";

const Logs = ({
    openLogs,
    setopenLogs,
}: {
    openLogs: boolean;
    setopenLogs: (openLogs: boolean) => void;
}) => {
    return (
        <Dialog onOpenChange={setopenLogs} open={openLogs}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export function BugAction() {
    const [openLogs, setopenLogs] = useState(false);
    return (
        <>
            <Logs openLogs={openLogs} setopenLogs={setopenLogs} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Bug className="h-[1.2rem] w-[1.2rem]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setopenLogs(true)}>Logs</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("ok")}>
                        Rapport d'erreur
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
