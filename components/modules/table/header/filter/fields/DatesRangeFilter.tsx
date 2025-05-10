import { Button } from "@vape/components/ui/button";
import { Calendar } from "@vape/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@vape/components/ui/popover";
import { FieldTable } from "@vape/types/modules/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { SetQueryValue } from "../../../context/Table.context";

type Props = {
    field: FieldTable;
    valuesFields: Record<string, string>;
    setQueryValue: SetQueryValue;
    disabled?: boolean;
};

export const resolveDate = (date: string | undefined): any => {
    if (!date) return {};
    const [from, to] = date.split("[to]");
    const fromResolved = new Date(from.replace("[from]", ""));
    if (date.includes("[from]undefined") || date.includes("[to]undefined"))
        return { from: fromResolved };
    return { from: fromResolved, to: new Date(to) };
};

const DatesRangeFilter = ({ field, valuesFields, setQueryValue, disabled }: Props) => {
    const handleDelete = () => {
        setQueryValue("datesRange", "delete", field.name);
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={"outline"}
                    className={"w-full justify-start text-left font-normal px-2"}
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
                    {valuesFields[field.name] ? (
                        <button
                            disabled={disabled}
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            type={"button"}
                            className={
                                "hover:text-white absolute right-0 cursor-pointer rounded-full top-1/2 -translate-y-2 -translate-x-2 hover:bg-destructive/80"
                            }
                        >
                            <X className="w-4 h-4" />
                        </button>
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={"end"}>
                <Calendar
                    locale={fr}
                    disabled={disabled}
                    onSelect={(dateRage) => {
                        if (dateRage) {
                            let from = undefined;
                            let to = undefined;
                            // if (dateRage.from)
                            //     from = new Date(gmtResolve(dateRage.from)).toISOString();
                            // if (dateRage.to) to = new Date(gmtResolve(dateRage.to)).toISOString();

                            if (dateRage.from) from = new Date(dateRage.from).toISOString();
                            if (dateRage.to) to = new Date(dateRage.to).toISOString();

                            setQueryValue(
                                "datesRange",
                                "add",
                                field.name,
                                `[from]${String(from)}[to]${String(to)}`
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
