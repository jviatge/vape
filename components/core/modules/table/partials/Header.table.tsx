import { Checkbox } from "@vape/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@vape/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useContext, useEffect } from "react";
import TablesContext from "../context/Table.context";
import useParamsTable from "../hook/useParamsTable";

export const HeaderTable = () => {
    const TC = useContext(TablesContext);
    const { set, get } = useParamsTable("sort");

    useEffect(() => {
        let sort = {};
        TC.tableBuilder.fields.map((column) => {
            if (get(column.name)) {
                sort = {
                    ...sort,
                    [column.name]: get(column.name),
                };
            }
        });
        TC.setSort(sort);
        return () => {};
    }, []);

    const handleSort = (columnName: string) => {
        if (TC.sort[columnName] === "desc") {
            set("", columnName);
            const sort = { ...TC.sort };
            delete sort[columnName];
            TC.setSort(sort);
            return;
        }
        if (TC.sort[columnName] === "asc") {
            set("desc", columnName);
            TC.setSort({
                ...TC.sort,
                [columnName]: "desc",
            });
        } else {
            set("asc", columnName);
            TC.setSort({
                ...TC.sort,
                [columnName]: "asc",
            });
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
                {TC.tableBuilder.fields.map((column) => (
                    <TableHead key={column.name} className="px-1.5">
                        <button
                            className="flex items-center hover:text-card-foreground hover:bg-card rounded-md font-semibold transition-colors duration-200 ease-in-out"
                            type="button"
                            onClick={() => handleSort(column.name)}
                        >
                            <span>{column.label ?? column.name}</span>

                            {TC.sort[column.name] !== "desc" && TC.sort[column.name] !== "asc" && (
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            )}
                            {TC.sort[column.name] === "asc" && (
                                <ArrowDown className="ml-2 h-4 w-4 text-primary" />
                            )}
                            {TC.sort[column.name] === "desc" && (
                                <ArrowUp className="ml-2 h-4 w-4 text-primary" />
                            )}
                        </button>
                    </TableHead>
                ))}
                <TableHead className="px-2">...</TableHead>
            </TableRow>
        </TableHeader>
    );
};
