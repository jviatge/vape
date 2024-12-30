"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Translation } from "@vape/actions/translation";
import { useTranslation } from "@vape/hooks/useTranslation";

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
    const { switchTranslation, currentTranslation, availableTranslations } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Flag className="h-[1.2rem] w-[1.2rem]" countryCode={currentTranslation()} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-0" align="end">
                {availableTranslations.data &&
                    availableTranslations.data.map((translation: Translation) =>
                        currentTranslation() !== translation.flag ? (
                            <DropdownMenuItem
                                className="flex items-center"
                                key={translation.locale}
                                onClick={() => switchTranslation(translation.locale)}
                            >
                                <span className="mr-2">
                                    {translation.locale.toLocaleUpperCase()}
                                </span>
                                <Flag
                                    className="h-[1.2rem] w-[1.2rem]"
                                    countryCode={translation.flag}
                                />
                            </DropdownMenuItem>
                        ) : null
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
