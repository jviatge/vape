import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { gmtResolve } from "@vape/lib/formatDate";
import { cn } from "@vape/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";

const locale = fr;

export const DatePicker = ({
    field,
    minDate,
    disabled,
}: {
    field: any;
    minDate?: "now" | string;
    disabled: boolean;
}) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    return (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        disabled={disabled}
                        variant={"outline"}
                        className={cn(
                            "bg-input pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                        ) : (
                            <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    captionLayout="dropdown"
                    locale={fr}
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(e) => {
                        e && field.onChange(gmtResolve(e));
                        setIsCalendarOpen(false);
                    }}
                    {...(minDate && {
                        fromDate: minDate === "now" ? new Date() : new Date(minDate),
                    })}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
