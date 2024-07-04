import { UseQueryResult } from "@tanstack/react-query";
import { Checkbox } from "@vape/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useContext, useEffect } from "react";
import TablesContext from "../context/Table.context";

export const HeaderTable = ({
    query: { getAll },
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
}) => {
    const TC = useContext(TablesContext);

    const handleSort = (columnName: string, keys?: string[]) => {
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

    useEffect(() => {
        !TC.mounted &&
            TC.tableBuilder.fields.map((column) => {
                if (TC.hideColumns.includes(column.name)) return null;
                if (column.orderDefault) {
                    TC.setQueryValue("sort", "add", column.name, column.orderDefault);
                }
            });
        TC.setMounted(true);
    }, [TC]);

    return (
        <TableHeader className="bg-card">
            <TableRow>
                <TableHead
                    onClick={(e) => {
                        if (TC.modeSelect !== "single") {
                            e.stopPropagation();
                            if (getAll.data.paginateData) {
                                if (TC.selectRowsDatas.length === getAll.data.paginateData.length) {
                                    TC.setSelectRowsDatas([]);
                                } else {
                                    TC.setSelectRowsDatas(getAll.data);
                                }
                            }
                        }
                    }}
                    className={cn(
                        "w-10 bg-card border-r flex justify-center items-center px-0 py-4",
                        TC.modeSelect !== "single" && "cursor-pointer"
                    )}
                >
                    {TC.modeSelect !== "single" ? (
                        <Checkbox
                            disabled={TC.loading}
                            checked={
                                getAll.data?.paginateData && getAll.data?.paginateData.length === 0
                                    ? false
                                    : getAll.data?.paginateData &&
                                      TC.selectRowsDatas.length === getAll.data.paginateData.length
                            }
                            className="mt-1"
                        />
                    ) : null}
                </TableHead>
                {TC.tableBuilder.fields.map((column, index) =>
                    TC.hideColumns.includes(column.name) ? null : (
                        <TableHead key={column.name + index} className="px-1.5">
                            <button
                                disabled={TC.loading}
                                className={cn(
                                    "flex items-center rounded-md font-semibold transition-colors duration-200 ease-in-out",
                                    !TC.loading && "hover:text-card-foreground hover:bg-card"
                                )}
                                type="button"
                                onClick={() => !column.keys && handleSort(column.name, column.keys)}
                            >
                                <span>{column.label ?? column.name}</span>

                                {column.keys ? null : (
                                    <>
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
                                    </>
                                )}
                            </button>
                        </TableHead>
                    )
                )}
            </TableRow>
        </TableHeader>
    );
};
