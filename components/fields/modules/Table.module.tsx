"use client";

import { Card } from "@vape/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@vape/components/ui/table";
import React from "react";
import BadgeView from "../views/Badge.view";
import BooleanView from "../views/Boolean.view";
import DateView from "../views/Date.view";
import HourView from "../views/Hour.view.";

export type TableBuilder = {
    label?: string;
    name: string;
    type: "string" | "date" | "boolean" | "hour" | "badge";
    format?: (value: any) => string;
}[];

interface TableModuleProps {
    table: TableBuilder;
    data: Record<string, any>[];
}

const TableModule: React.FC<TableModuleProps> = ({ table, data }) => {
    return (
        <Card className="overflow-hidden">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-card">
                    <TableRow>
                        {table.map((column) => (
                            <TableHead key={column.name} className="px-2">
                                {column.label ?? column.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-primary-foreground">
                    {data.map((row: Record<string, any>, index: number) => (
                        <TableRow key={index}>
                            {table.map((column, index) => (
                                <TableCell key={column.name + index} className="p-2">
                                    {column.type === "date" ? (
                                        <DateView value={row[column.name]} />
                                    ) : column.type === "hour" ? (
                                        <HourView value={row[column.name]} />
                                    ) : column.type === "boolean" ? (
                                        <BooleanView value={row[column.name] as boolean} />
                                    ) : column.type === "badge" ? (
                                        <BadgeView value={row[column.name]} />
                                    ) : (
                                        String(row[column.name])
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default TableModule;
