"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { queryDeleteByModule } from "@vape/actions/queries";
import { Button } from "@vape/components/ui/button";
import { Card } from "@vape/components/ui/card";
import { Checkbox } from "@vape/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@vape/components/ui/table";
import { Permissions } from "@vape/lib/permissions";
import { Trash2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import BadgeView from "../../views/Badge.view";
import BooleanView from "../../views/Boolean.view";
import DateView from "../../views/Date.view";
import HourView from "../../views/Hour.view.";
import PaginationTable from "./Pagination";
import Header from "./header/Header";

export type TableBuilder = {
    type: "table";
    model: string;
    remove?: string;
    get: string;
    fields: {
        label?: string;
        name: string;
        type: "string" | "date" | "boolean" | "hour" | "badge";
        format?: (value: any) => string;
    }[];
};

interface TableModuleProps {
    tableBuilder: TableBuilder;
    data: Record<string, any>[];
    permissions?: Permissions;
}

const TableModule: React.FC<TableModuleProps> = ({ tableBuilder, data, permissions }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [deleteData, setDeleteData] = useState<null | number>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <Header />

            <Card className="overflow-hidden">
                <Table>
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
                            {tableBuilder.fields.map((column) => (
                                <TableHead key={column.name} className="px-1.5">
                                    {column.label ?? column.name}
                                </TableHead>
                            ))}
                            <TableHead className="px-2">...</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-primary-foreground">
                        {data
                            ? data.map((row: Record<string, any>, index: number) => (
                                  <TableRow
                                      key={index}
                                      className="cursor-pointer pointer-events-auto"
                                      onClick={() => router.push(`${pathname}/${row.id}`)}
                                  >
                                      <TableCell className="flex w-10 bg-card border-r justify-center items-center px-0 py-3">
                                          <Checkbox
                                              className="mt-1"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                              }}
                                          />
                                      </TableCell>

                                      {tableBuilder.fields.map((column, index) => (
                                          <TableCell
                                              key={column.name + index}
                                              className="p-1.5 text-sm"
                                          >
                                              {column.type === "date" ? (
                                                  <DateView value={row[column.name]} />
                                              ) : column.type === "hour" ? (
                                                  <HourView value={row[column.name]} />
                                              ) : column.type === "boolean" ? (
                                                  <BooleanView
                                                      value={row[column.name] as boolean}
                                                  />
                                              ) : column.type === "badge" ? (
                                                  <BadgeView value={row[column.name]} />
                                              ) : (
                                                  String(row[column.name])
                                              )}
                                          </TableCell>
                                      ))}

                                      <TableCell className="p-2">
                                          {tableBuilder.remove && permissions?.delete ? (
                                              <Button
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      setDeleteData(row.id);
                                                  }}
                                                  variant={"destructive"}
                                                  className="p-2 h-6"
                                              >
                                                  <Trash2Icon size={15} />
                                              </Button>
                                          ) : null}
                                      </TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </Card>

            <AlertDialog open={deleteData ? true : false}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading} onClick={() => setDeleteData(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true);
                                if (tableBuilder.remove) {
                                    await queryDeleteByModule({
                                        model: tableBuilder.model,
                                        remove: tableBuilder.remove,
                                        id: String(deleteData),
                                    });
                                }
                                setDeleteData(null);
                                setLoading(false);
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <PaginationTable />
        </>
    );
};

export default TableModule;
