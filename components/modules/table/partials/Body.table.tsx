import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { Checkbox } from "@vape/components/ui/checkbox";
import { Loading } from "@vape/components/ui/loading";
import { TableBody, TableCell, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { ArchiveRestore, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { Action } from "../Action";
import { DeleteAction } from "../actions/Delete";
import { RestoreAction } from "../actions/Restore";
import TablesContext from "../context/Table.context";
import { RenderFields } from "../render/RenderFields";

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

    const handleSelectRow = (row: Record<string, any>) => {
        if (TC.modeSelect === "single") {
            TC.setSelectRowsDatas([row]);
            return;
        }
        if (TC.selectRowsDatas.some((item: any) => item.id === row.id)) {
            TC.setSelectRowsDatas(TC.selectRowsDatas.filter((item: any) => item.id !== row.id));
        } else {
            TC.setSelectRowsDatas([...TC.selectRowsDatas, row]);
        }
    };

    const RowsData = ({ data }: { data: Record<string, any>[] }) =>
        data.map((row: Record<string, any>, index: number) => (
            <TableRow
                key={index}
                className={cn(
                    "cursor-pointer pointer-events-auto table-row",
                    TC.selectRowsDatas.some((item: any) => item.id === row.id) &&
                        "bg-accent hover:bg-accent"
                )}
            >
                <TableCell
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(row);
                    }}
                    className={cn(
                        "flex justify-center items-center w-10 bg-card border-r px-0 py-3 sticky left-0 z-10",
                        TC.selectRowsDatas.some((item: any) => item.id === row.id) &&
                            "bg-accent hover:bg-accent"
                    )}
                >
                    <Checkbox
                        className={cn("mt-1", TC.modeSelect === "single" && "rounded-full")}
                        checked={TC.selectRowsDatas.some((item: any) => item.id === row.id)}
                    />
                </TableCell>

                {TC.tableBuilder.fields.map((column, index) =>
                    TC.hideColumns.includes(column.name) || column.type === "hidden" ? null : (
                        <TableCell
                            onClick={() => {
                                if (TC.modeSelect === "single" || TC.modeSelect === "multiple") {
                                    handleSelectRow(row);
                                } else {
                                    router.push(`${pathname}/${row.id}`);
                                }
                            }}
                            key={column.name + index}
                            className="py-1.5 px-0 text-sm"
                        >
                            <RenderFields column={column} row={row} />
                        </TableCell>
                    )
                )}
                {(TC.tableBuilder.actions && TC.tableBuilder.actions.length > 0) ||
                (TC.permissions && TC.permissions.delete) ? (
                    <TableCell
                        style={{ boxShadow: "inset 7px -1px 0px -6px hsl(var(--border))" }}
                        className={cn(
                            "p-0 sticky md:right-0 z-10 shadow-xl shadow-border table-cell-actions",
                            TC.selectRowsDatas.some((item: any) => item.id === row.id) &&
                                "bg-accent hover:bg-accent"
                        )}
                    >
                        <div className="flex w-full items-center justify-center h-full">
                            {TC.tableBuilder.actions &&
                            TC.tableBuilder.actions.length > 0 &&
                            !TC.modeTrash
                                ? TC.tableBuilder.actions.map((action, index) =>
                                      action.single ? (
                                          <Action key={index} action={action} dataRow={row} />
                                      ) : null
                                  )
                                : null}
                            {TC.permissions && TC.permissions.delete ? (
                                <>
                                    {TC.modeTrash ? (
                                        <RestoreAction data={row}>
                                            <Button
                                                size="icon"
                                                type="button"
                                                className="pointer-events-auto border h-7 w-7 bg-green-500 text-white"
                                            >
                                                <ArchiveRestore className="h-3.5 w-3.5" />
                                            </Button>
                                        </RestoreAction>
                                    ) : null}
                                    <DeleteAction data={row}>
                                        <Button
                                            size="icon"
                                            type="button"
                                            variant={"destructive"}
                                            className="pointer-events-auto border h-7 w-7"
                                        >
                                            <Trash className="h-3.5 w-3.5" />
                                        </Button>
                                    </DeleteAction>
                                </>
                            ) : null}
                        </div>
                    </TableCell>
                ) : null}
            </TableRow>
        ));

    return (
        <TableBody>
            {!getAll.isLoading && getAll.data && getAll.data ? (
                getAll.data.paginateData && getAll.data.paginateData.length > 0 ? (
                    <RowsData data={getAll.data.paginateData} />
                ) : getAll.data && getAll.data.length > 0 ? (
                    <RowsData data={getAll.data} />
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
