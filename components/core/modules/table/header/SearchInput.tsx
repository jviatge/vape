import { Input } from "@vape/components/ui/input";
import { Search } from "lucide-react";

export const SearchInput = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <div className="h-10 flex items-center bg-primary-foreground rounded-l-md border-l border-y cursor-pointer">
                    <Search className="pointer-events-none mx-3" size={18} />
                </div>
                <Input
                    placeholder="Rechercher"
                    className="w-full rounded-l-none rounded-r-md border border-border"
                />
            </div>
        </div>
    );
};
