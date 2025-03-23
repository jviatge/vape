import { UseQueryResult } from "@tanstack/react-query";
import { Checkbox } from "@vape/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@vape/components/ui/table";
import { cn } from "@vape/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useCallback, useContext, useEffect } from "react";
import TablesContext from "../context/Table.context";

export const HeaderTable = ({
    query: { getAll },
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
}) => {
    const TC = useContext(TablesContext);

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

    const getValue = useCallback(
        (key: string) => {
            let value: null | any = null;
            if (key) {
                if (key.includes(".")) {
                    const fields = key.split(".");
                    fields.map((field) => {
                        if (TC.query.sort[field] && !value) {
                            value = TC.query.sort[field];
                        }
                        if (value && value[field]) {
                            value = value[field];
                        }
                    });
                } else {
                    value = TC.query.sort[key];
                }
            }
            return value;
        },
        [TC.query.sort]
    );

    const handleSort = (key: string) => {
        if (key) {
            const value = getValue(key);
            if (value === "desc") {
                TC.setQueryValue("sort", "delete", key);
                return;
            }
            if (value === "asc") {
                TC.setQueryValue("sort", "add", key, "desc");
            } else {
                TC.setQueryValue("sort", "add", key, "asc");
            }
        }
    };

    const defaultChecked = useCallback((): boolean => {
        const data = getAll.data?.paginateData ? getAll.data.paginateData : getAll.data;
        return data && data.length > 0 && data.length === TC.selectRowsDatas.length;
    }, [getAll.data, TC.selectRowsDatas]);

    const handleSelectAll = (e: any) => {
        if (TC.modeSelect !== "single") {
            e.stopPropagation();
            if (getAll.data.paginateData) {
                if (TC.selectRowsDatas.length === getAll.data.paginateData.length) {
                    TC.setSelectRowsDatas([]);
                } else {
                    TC.setSelectRowsDatas(getAll.data.paginateData);
                }
            } else {
                if (TC.selectRowsDatas.length === getAll.data.length) {
                    TC.setSelectRowsDatas([]);
                } else {
                    TC.setSelectRowsDatas(getAll.data);
                }
            }
        }
    };

    return (
        <TableHeader className="bg-card table-header">
            <TableRow>
                <TableHead
                    onClick={handleSelectAll}
                    className={cn(
                        "w-10 bg-card border-r flex justify-center items-center px-0 py-4 sticky left-0 z-10",
                        TC.modeSelect !== "single" && "cursor-pointer"
                    )}
                >
                    {TC.modeSelect !== "single" ? (
                        <Checkbox
                            disabled={TC.loading}
                            checked={defaultChecked()}
                            defaultChecked={false}
                            className="mt-1"
                        />
                    ) : null}
                </TableHead>
                {TC.tableBuilder.fields.map((column, index) =>
                    TC.hideColumns.includes(column.name) || column.type === "hidden" ? null : (
                        <TableHead
                            key={column.name + index}
                            className={cn(
                                "px-1.5",
                                index === 0 && "pl-3",
                                TC.tableBuilder.fields.length - 1 === index && "pr-1.5"
                            )}
                        >
                            <button
                                disabled={TC.loading}
                                className={cn(
                                    "flex items-center rounded-md font-semibold transition-colors duration-200 ease-in-out py-1 px-1.5 -translate-x-1.5",
                                    getValue(column.name) !== "desc" &&
                                        getValue(column.name) !== "asc"
                                        ? "hover:text-card-foreground hover:bg-card"
                                        : "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                                )}
                                type="button"
                                onClick={() => handleSort(column.name)}
                            >
                                <span className="text-nowrap">{column.label ?? column.name}</span>
                                {getValue(column.name) !== "desc" &&
                                    getValue(column.name) !== "asc" && (
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    )}
                                {getValue(column.name) === "asc" && (
                                    <ArrowDown className="ml-2 h-4 w-4" />
                                )}
                                {getValue(column.name) === "desc" && (
                                    <ArrowUp className="ml-2 h-4 w-4" />
                                )}
                            </button>
                        </TableHead>
                    )
                )}
                {(TC.tableBuilder.actions && TC.tableBuilder.actions.length > 0) ||
                (TC.permissions && TC.permissions.delete) ? (
                    <TableHead
                        style={{
                            boxShadow: "inset 7px -1px 0px -6px hsl(var(--border))",
                            width: "100px",
                        }}
                        className="text-center md:sticky right-0 z-10 table-header-actions"
                    >
                        Action
                    </TableHead>
                ) : null}
            </TableRow>
        </TableHeader>
    );
};
