import { Checkbox } from "@vape/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useContext } from "react";
import TablesContext from "../context/Table.context";

export const HeaderTable = () => {
    const TC = useContext(TablesContext);

    const handleSort = (columnName: string) => {
        if (TC.query.sort[columnName] === "desc") {
            TC.setQueryValue("sort", "delete", columnName);
            return;
        }
        if (TC.query.sort[columnName] === "asc") {
            TC.setQueryValue("sort", "add", columnName, "desc");
        } else {
            TC.setQueryValue("sort", "add", columnName, "asc");
        }
    };

    return (
        <TableHeader className="bg-card">
            <TableRow>
                <TableHead className="w-10 bg-card border-r flex justify-center items-center px-0 py-4">
                    <Checkbox
                        className="mt-1"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    />
                </TableHead>
                {TC.tableBuilder.fields.map((column) =>
                    TC.hideColumns.includes(column.name) ? null : (
                        <TableHead key={column.name} className="px-1.5">
                            <button
                                disabled={TC.loading}
                                className={cn(
                                    "flex items-center rounded-md font-semibold transition-colors duration-200 ease-in-out",
                                    !TC.loading && "hover:text-card-foreground hover:bg-card"
                                )}
                                type="button"
                                onClick={() => handleSort(column.name)}
                            >
                                <span>{column.label ?? column.name}</span>

                                {TC.query.sort[column.name] !== "desc" &&
                                    TC.query.sort[column.name] !== "asc" && (
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    )}
                                {TC.query.sort[column.name] === "asc" && (
                                    <ArrowDown className="ml-2 h-4 w-4 text-primary" />
                                )}
                                {TC.query.sort[column.name] === "desc" && (
                                    <ArrowUp className="ml-2 h-4 w-4 text-primary" />
                                )}
                            </button>
                        </TableHead>
                    )
                )}
                <TableHead className="px-2">...</TableHead>
            </TableRow>
        </TableHeader>
    );
};
