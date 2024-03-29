import { UseQueryResult } from "@tanstack/react-query";
import { Checkbox } from "@vape/components/ui/checkbox";
import { Loading } from "@vape/components/ui/loading";
import { TableBody, TableCell, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import BadgeView from "../../../views/Badge.view";
import BooleanView from "../../../views/Boolean.view";
import DateView from "../../../views/Date.view";
import HourView from "../../../views/Hour.view.";
import { Action } from "../Action";
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
                                TC.selectRowsDatas.some((item: any) => item.id === row.id) &&
                                    "bg-muted/50"
                            )}
                        >
                            <TableCell
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                        TC.selectRowsDatas.some((item: any) => item.id === row.id)
                                    ) {
                                        TC.setSelectRowsDatas(
                                            TC.selectRowsDatas.filter(
                                                (item: any) => item.id !== row.id
                                            )
                                        );
                                    } else {
                                        TC.setSelectRowsDatas([...TC.selectRowsDatas, row]);
                                    }
                                }}
                                className="flex w-10 bg-card border-r justify-center items-center px-0 py-3"
                            >
                                <Checkbox
                                    className="mt-1"
                                    checked={TC.selectRowsDatas.some(
                                        (item: any) => item.id === row.id
                                    )}
                                />
                            </TableCell>

                            {TC.tableBuilder.fields.map((column, index) =>
                                TC.hideColumns.includes(column.name) ? null : (
                                    <TableCell
                                        onClick={() => router.push(`${pathname}/${row.id}`)}
                                        key={column.name + index}
                                        className="p-1.5 text-sm"
                                    >
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
                            {/* // TODO: Permissions filter by token user */}
                            {TC.tableBuilder.actions && TC.tableBuilder.actions.length > 0 ? (
                                <TableCell className="p-0 pointer-events-none bg-card border-l">
                                    <div className="flex justify-center items-center w-full h-full">
                                        {TC.tableBuilder.actions.map((action, index) =>
                                            action.single ? (
                                                <Action key={index} action={action} dataRow={row} />
                                            ) : null
                                        )}
                                    </div>
                                </TableCell>
                            ) : null}
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
