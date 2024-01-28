"use client";

import { Button } from "@vape/components/ui/button";
import { Card } from "@vape/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@vape/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
    const router = useRouter();
    const pathname = usePathname();

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
                        <TableHead className="px-2">...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-primary-foreground">
                    {data.map((row: Record<string, any>, index: number) => (
                        <TableRow
                            key={index}
                            className="cursor-pointer pointer-events-auto"
                            onClick={() => router.push(`${pathname}/${row.id}`)}
                        >
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
                            <TableCell className="p-2">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("delete");
                                    }}
                                    variant={"destructive"}
                                    className="p-2 h-6"
                                >
                                    <Trash2Icon size={15} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default TableModule;
