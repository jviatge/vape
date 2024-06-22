import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { gmtResolve } from "@vape/lib/formatDate";
import { cn } from "@vape/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";

const locale = fr;

export const DatePicker = ({
    field,
    minDate,
    disabled,
}: {
    field: any;
    minDate?: Date;
    disabled: boolean;
}) => {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            disabled={disabled}
                            variant={"outline"}
                            className={cn(
                                "bg-card pl-3 text-left font-normal",
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
                    <PopoverClose>
                        <Calendar
                            captionLayout="dropdown"
                            locale={fr}
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(dateSelect) => {
                                dateSelect && field.onChange(gmtResolve(dateSelect));
                            }}
                            {...(minDate && { fromDate: minDate })}
                            // fromYear={2015}
                            // toYear={2025}
                            //disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                        />
                    </PopoverClose>
                </PopoverContent>
            </Popover>
        </>
    );
};
