import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { Checkbox } from "@vape/components/ui/checkbox";
import { Loading } from "@vape/components/ui/loading";
import { TableBody, TableCell, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { Trash2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import BadgeView from "../../../views/Badge.view";
import BooleanView from "../../../views/Boolean.view";
import DateView from "../../../views/Date.view";
import HourView from "../../../views/Hour.view.";
import TablesContext from "../context/Table.context";

export const BodyTable = ({
    query: { getAll },
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const TC = useContext(TablesContext);

    return (
        <TableBody className="bg-primary-foreground">
            {!getAll.isLoading && getAll.data && getAll.data ? (
                getAll.data.paginateData.length > 0 ? (
                    getAll.data.paginateData.map((row: Record<string, any>, index: number) => (
                        <TableRow
                            key={index}
                            className={cn(
                                "cursor-pointer pointer-events-auto",
                                TC.selectIds.includes(row.id) && "bg-muted/50"
                            )}
                            onClick={() => router.push(`${pathname}/${row.id}`)}
                        >
                            <TableCell
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (TC.selectIds.includes(row.id)) {
                                        TC.setSelectIds(TC.selectIds.filter((id) => id !== row.id));
                                    } else {
                                        TC.setSelectIds([...TC.selectIds, row.id]);
                                    }
                                }}
                                className="flex w-10 bg-card border-r justify-center items-center px-0 py-3"
                            >
                                <Checkbox
                                    className="mt-1"
                                    checked={TC.selectIds.includes(row.id)}
                                />
                            </TableCell>

                            {TC.tableBuilder.fields.map((column, index) =>
                                TC.hideColumns.includes(column.name) ? null : (
                                    <TableCell key={column.name + index} className="p-1.5 text-sm">
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
                                )
                            )}

                            <TableCell className="p-2">
                                {TC.tableBuilder.remove && TC.permissions?.delete ? (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            TC.setSelectID(row.id);
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
                ) : (
                    <TableRow className="pointer-events-auto">
                        <TableCell
                            className="p-1.5 text-sm overflow-hidden"
                            colSpan={TC.tableBuilder.fields.length + 2}
                        >
                            <div className="flex justify-center w-full py-2">
                                <p>Aucune donnée disponible</p>
                            </div>
                        </TableCell>
                    </TableRow>
                )
            ) : (
                <TableRow className="pointer-events-auto">
                    <TableCell
                        className="p-1.5 text-sm overflow-hidden"
                        colSpan={TC.tableBuilder.fields.length + 2}
                    >
                        <div className="flex justify-center w-full py-2">
                            <Loading />
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};
