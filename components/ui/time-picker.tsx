//time-picker.tsx
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { cn } from "@vape/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl } from "./form";
import { Input } from "./input";
import { PopoverTrigger } from "./popover";

export const TimePicker = ({ field }: { field: any }) => {
    const [calendarOpen, setCalendarOpen] = useState(false);

    return (
        <Popover open={calendarOpen} onOpenChange={(open) => setCalendarOpen(open)}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            `${field.value.toLocaleString([], {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}`
                        ) : (
                            <span>Select Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    className="p-0"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                />
                <Input
                    type="time"
                    className="mt-2"
                    // take locale date time string in format that the input expects (24hr time)
                    value={field.value.toLocaleTimeString([], {
                        hourCycle: "h23",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    // take hours and minutes and update our Date object then change date object to our new value
                    onChange={(selectedTime) => {
                        const currentTime = field.value;
                        currentTime.setHours(
                            parseInt(selectedTime.target.value.split(":")[0]),
                            parseInt(selectedTime.target.value.split(":")[1]),
                            0
                        );
                        field.onChange(currentTime);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};
