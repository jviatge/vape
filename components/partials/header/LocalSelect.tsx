"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocal } from "@vape/hooks/useLocal";

import Flags from "country-flag-icons/react/3x2";

type FlagProps = {
    countryCode: string;
    className?: string;
};

const Flag = ({ countryCode, className }: FlagProps) => {
    const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
    return FlagComponent ? <FlagComponent className={className} /> : null;
};

export function LocalSelect() {
    const { switchLocal, currentLocal, availableLocals } = useLocal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Flag className="h-[1.2rem] w-[1.2rem]" countryCode={currentLocal()} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {availableLocals().map((local) => (
                    <DropdownMenuItem key={local} onClick={() => switchLocal(local)}>
                        <Flag className="h-[1.2rem] w-[1.2rem]" countryCode={local} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
