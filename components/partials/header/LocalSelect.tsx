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

export function LocalSelect() {
    const { switchTranslation, local, availableTranslations } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {local.toLocaleUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-0" align="end">
                {availableTranslations.data &&
                    availableTranslations.data.map((translation: Translation) =>
                        local !== translation.flag ? (
                            <DropdownMenuItem
                                className="flex items-center"
                                key={translation.locale}
                                onClick={() => switchTranslation(translation.locale)}
                            >
                                <span className="mr-2">
                                    {translation.locale.toLocaleUpperCase()}
                                </span>
                            </DropdownMenuItem>
                        ) : null
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
