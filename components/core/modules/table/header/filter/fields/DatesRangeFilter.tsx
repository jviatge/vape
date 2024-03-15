import { Button } from "@vape/components/ui/button";
import { Calendar } from "@vape/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@vape/components/ui/popover";
import { FieldTable } from "@vape/types/modules/table/table";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SetQueryValue } from "../../../context/Table.context";

type Props = {
    field: FieldTable;
    valuesFields: Record<string, string>;
    setQueryValue: SetQueryValue;
    disabled?: boolean;
};

const DatesRangeFilter = ({ field, valuesFields, setQueryValue, disabled }: Props) => {
    const resolveDate = (date: string | undefined): any => {
        if (!date) return {};

        const [from, to] = date.split("[to]");
        const fromResolved = new Date(from.replace("[dateRange][from]", ""));

        if (date.includes("[dateRange][from]undefined") || date.includes("[to]undefined"))
            return { from: fromResolved };

        return { from: fromResolved, to: new Date(to) };
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={"outline"}
                    className={"w-full justify-start text-left font-normal"}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {resolveDate(valuesFields[field.name]).from ? (
                        resolveDate(valuesFields[field.name]).to ? (
                            <span>
                                {format(resolveDate(valuesFields[field.name]).from, "dd/MM/yy")} -{" "}
                                {format(resolveDate(valuesFields[field.name]).to, "dd/MM/yy")}
                            </span>
                        ) : (
                            <span>
                                {format(resolveDate(valuesFields[field.name]).from, "dd/MM/yy")}{" "}
                                {"< ..."}
                            </span>
                        )
                    ) : (
                        <span className={"text-muted-foreground"}>Date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={"end"}>
                <Calendar
                    disabled={disabled}
                    onSelect={(dateRage) => {
                        if (dateRage) {
                            setQueryValue(
                                "datesRange",
                                "add",
                                field.name,
                                `[from]${String(dateRage?.from?.toISOString())}[to]${String(
                                    dateRage?.to?.toISOString()
                                )}`
                            );
                        } else {
                            setQueryValue("datesRange", "delete", field.name);
                        }
                    }}
                    initialFocus
                    mode="range"
                    selected={resolveDate(valuesFields[field.name])}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
};

export { DatesRangeFilter };
