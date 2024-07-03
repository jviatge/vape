import { UseQueryResult } from "@tanstack/react-query";
import BadgeView from "@vape/components/core/views/Badge.view";
import Empty from "@vape/components/core/views/Empty";
import { Checkbox } from "@vape/components/ui/checkbox";
import { Loading } from "@vape/components/ui/loading";
import { TableBody, TableCell, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import BooleanView from "../../../views/Boolean.view";
import DateView from "../../../views/Date.view";
import HourView from "../../../views/Hour.view.";
import { resolveStringObject } from "../../lib/getData";
import TablesContext from "../context/Table.context";
import { RenderCustom } from "../render/custom/Custom.render";

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
                    "cursor-pointer pointer-events-auto",
                    TC.selectRowsDatas.some((item: any) => item.id === row.id) && "bg-muted/50"
                )}
            >
                <TableCell
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(row);
                    }}
                    className="flex w-10 bg-card border-r justify-center items-center px-0 py-3"
                >
                    <Checkbox
                        className={cn("mt-1", TC.modeSelect === "single" && "rounded-full")}
                        checked={TC.selectRowsDatas.some((item: any) => item.id === row.id)}
                    />
                </TableCell>

                {TC.tableBuilder.fields.map((column, index) =>
                    TC.hideColumns.includes(column.name) ? null : (
                        <TableCell
                            onClick={() => {
                                if (TC.modeSelect === "single" || TC.modeSelect === "multiple") {
                                    handleSelectRow(row);
                                } else {
                                    router.push(`${pathname}/${row.id}`);
                                }
                            }}
                            key={column.name + index}
                            className="p-1.5 text-sm"
                        >
                            {column.type === "custom" && column.component ? (
                                <RenderCustom component={column.component} row={row} />
                            ) : column.type === "boolean" ? (
                                <BooleanView value={row[column.name] as boolean} />
                            ) : resolveStringObject(column.name, row) ? (
                                column.type === "date" ? (
                                    <DateView value={row[column.name]} />
                                ) : column.type === "time" ? (
                                    <HourView value={row[column.name]} />
                                ) : column.type === "badge" ? (
                                    <BadgeView
                                        minLabel={column.minLabel}
                                        value={resolveStringObject(column.name, row)}
                                        options={column.options}
                                    />
                                ) : column.keys && column.keys.length > 0 ? (
                                    column.keys.map((key, index) => (
                                        <span key={key + index} className="mr-1 text-nowrap">
                                            {resolveStringObject(key, row[column.name])}
                                        </span>
                                    ))
                                ) : (
                                    <span className="mr-1 text-nowrap">
                                        {resolveStringObject(column.name, row)}
                                    </span>
                                )
                            ) : (
                                <Empty />
                            )}
                        </TableCell>
                    )
                )}
            </TableRow>
        ));

    return (
        <TableBody className="bg-primary-foreground">
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
