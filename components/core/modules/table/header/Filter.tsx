import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export const Filter = ({
    query,
    disabled,
}: {
    query: { getAll: UseQueryResult<any, Error> };
    disabled?: boolean;
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"secondary"} className="border">
                    <span className="mr-3">Filtre</span>
                    <SlidersHorizontal className="pointer-events-none" size={18} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Max. width</Label>
                        <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Max. height</Label>
                        <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
