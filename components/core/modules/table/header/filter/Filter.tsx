import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@vape/components/ui/button";
import { Notification } from "@vape/components/ui/notification";
import { SlidersHorizontal } from "lucide-react";
import { useCallback, useContext, useMemo } from "react";
import TableContext from "../../context/Table.context";
import { BooleanFilter } from "./fields/BooleanFilter";
import { ContainsFilter } from "./fields/ContainsFilter";
import { DatesRangeFilter } from "./fields/DatesRangeFilter";
import { SelectFilter } from "./fields/SelectFilter";

export const Filter = () => {
    const TC = useContext(TableContext);

    const countFilters = useCallback(() => {
        return Object.keys({
            ...TC.query.select,
            ...TC.query.contains,
            ...TC.query.boolean,
            ...TC.query.datesRange,
            ...TC.query.equals,
        }).length;
    }, [TC.query]);

    const filters = useMemo(() => {
        return TC.tableBuilder.fields.filter((column) => column.filter) ?? null;
    }, [TC.tableBuilder.fields]);

    /* useEffect(() => {
        const filterParams = getAll("filter", true);
        TC.setFilter((v: Record<string, string>) => ({
            ...v,
            ...filterParams,
        }));
    }, []);
 */
    console.log(TC.query.contains);

    return filters.length > 0 ? (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"secondary"} className={"border relative"}>
                    <Notification number={countFilters()} />
                    <span className="mr-3">Filtres</span>
                    <SlidersHorizontal className="pointer-events-none" size={18} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="space-y-4 w-full">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filtres avancer</h4>
                </div>
                <div className="space-y-3 w-full">
                    {filters.map((field, index) => {
                        return (
                            <div key={index} className="flex items-center w-full">
                                <Label htmlFor={field.name} className="w-full text-nowrap">
                                    <span className="w-full mr-2">
                                        {field.filter?.label ?? field.label}
                                    </span>
                                </Label>
                                <div className="w-full">
                                    <div className="w-48 min-h-8 flex justify-start items-center relative">
                                        {field.filter?.type === "select" ? (
                                            <SelectFilter
                                                field={field}
                                                valuesFields={TC.query.select}
                                                setQueryValue={TC.setQueryValue}
                                                disabled={TC.loading}
                                            />
                                        ) : null}
                                        {field.filter?.type === "contains" ||
                                        field.filter?.type === "number" ? (
                                            <ContainsFilter
                                                type={
                                                    field.filter.type === "number"
                                                        ? "number"
                                                        : "text"
                                                }
                                                field={field}
                                                valuesFields={
                                                    field.filter.type === "number"
                                                        ? TC.query.equals
                                                        : TC.query.contains
                                                }
                                                setQueryValue={TC.setQueryValue}
                                                disabled={TC.loading}
                                            />
                                        ) : null}

                                        {field.filter?.type === "datesRange" ? (
                                            <DatesRangeFilter
                                                field={field}
                                                valuesFields={TC.query.datesRange}
                                                setQueryValue={TC.setQueryValue}
                                                disabled={TC.loading}
                                            />
                                        ) : null}
                                        {field.filter?.type === "boolean" ? (
                                            <BooleanFilter
                                                field={field}
                                                valuesFields={TC.query.boolean}
                                                setQueryValue={TC.setQueryValue}
                                                disabled={TC.loading}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    ) : null;
};
