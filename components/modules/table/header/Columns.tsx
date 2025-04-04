import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@vape/components/ui/button";
import { useTranslation } from "@vape/hooks/useTranslation";
import { cn } from "@vape/lib/utils";
import { ChevronDown } from "lucide-react";
import { useContext } from "react";
import TableContext from "../context/Table.context";

export const Columns = () => {
    const { T } = useTranslation();
    const TC = useContext(TableContext);

    const disabled = false;

    const options = TC.tableBuilder.fields
        .filter((field) => field.type !== "hidden")
        .map((field) => {
            return {
                name: field.name,
                label: field.label,
                hidden: field?.hidden ?? false,
            };
        });

    const handleHideColumns = (value: boolean, name: string) => {
        TC.setHideColumns(
            value ? TC.hideColumns.filter((col) => col !== name) : [...TC.hideColumns, name]
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className={cn("border", !disabled && "ml-auto")}>
                    {T("table.columns")}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {options.map((option, index) => (
                    <DropdownMenuCheckboxItem
                        onSelect={(event) => event.preventDefault()}
                        key={option.name + index}
                        className="capitalize cursor-pointer"
                        checked={!TC.hideColumns.includes(option.name)}
                        onCheckedChange={(value) => handleHideColumns(value, option.name)}
                    >
                        {option.label ?? option.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
