import { Checkbox } from "@vape/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@vape/components/ui/table";
import { useContext } from "react";
import TablesContext from "../context/Table.context";

export const HeaderTable = () => {
    const TC = useContext(TablesContext);
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
                        {column.label ?? column.name}
                    </TableHead>
                ))}
                <TableHead className="px-2">...</TableHead>
            </TableRow>
        </TableHeader>
    );
};
