//time-picker.tsx
import { cn } from "@vape/lib/utils";
import * as React from "react";
import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode } from "react";
import type { Options } from "timescape";
import { useTimescape, type DateType } from "timescape/react";

export type TimePickerProps = HTMLAttributes<HTMLDivElement> & {
    value?: Date;
    onChange: (date?: Date) => void;
    children: ReactNode;
    options?: Omit<Options, "date" | "onChangeDate">;
};
type TimePickerContextValue = ReturnType<typeof useTimescape>;
const TimePickerContext = createContext<TimePickerContextValue | null>(null);

const useTimepickerContext = (): TimePickerContextValue => {
    const context = useContext(TimePickerContext);
    if (!context) {
        throw new Error(
            "Unable to access TimePickerContext. This component should be wrapped by a TimePicker component"
        );
    }
    return context;
};

const TimePicker = forwardRef<React.ElementRef<"div">, TimePickerProps>(
    ({ value, onChange, options, className, ...props }, ref) => {
        const timePickerContext = useTimescape({
            date: new Date("00:00:00"),
            onChangeDate: (nextDate) => {
                console.log("Date changed to", nextDate?.toISOString, onChange);
            },
            ...options,
        });
        return (
            <TimePickerContext.Provider value={timePickerContext}>
                <div
                    ref={ref}
                    {...props}
                    className={cn(
                        "flex w-auto h-10 rounded-md border border-input bg-background px-3 py-1 text-sm",
                        "ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                ></div>
            </TimePickerContext.Provider>
        );
    }
);
TimePicker.displayName = "TimePicker";

type TimePickerSegmentProps = Omit<HTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    segment: DateType;
    inputClassName?: string;
};

const TimePickerSegment = forwardRef<React.ElementRef<"input">, TimePickerSegmentProps>(
    ({ segment, inputClassName, className, ...props }, ref) => {
        const { getInputProps } = useTimepickerContext();
        const { ref: timePickerInputRef } = getInputProps(segment);
        return (
            <div
                className={cn("rounded-md focus-within:bg-accent text-accent-foreground px-2 py-1")}
            >
                <input
                    ref={(node) => {
                        if (typeof ref === "function") {
                            ref(node);
                        } else {
                            if (ref) ref.current = node;
                        }
                        timePickerInputRef(node);
                    }}
                    {...props}
                    className={cn(
                        "tabular-nums caret-transparent",
                        "bg-transparent ring-0 ring-offset-0 border-transparent focus-visible:border-transparent focus-visible:ring-0 outline-none",
                        inputClassName
                    )}
                />
            </div>
        );
    }
);
TimePickerSegment.displayName = "TimePickerSegment";

type TimePickerSeparatorProps = HTMLAttributes<HTMLSpanElement>;
const TimePickerSeparator = forwardRef<React.ElementRef<"span">, TimePickerSeparatorProps>(
    ({ className, ...props }, ref) => {
        return <span ref={ref} {...props} className={cn("text-sm py-1", className)}></span>;
    }
);
TimePickerSeparator.displayName = "TimePickerSeparator";

export { TimePicker, TimePickerSegment, TimePickerSeparator };
