import { CheckIcon, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
    options: Option[];
    value?: string[] | string;
    onChange?: (values: string[] | string) => void;
    placeholder?: string;
    inputPlaceholder?: string;
    emptyPlaceholder?: string;
    className?: string;
    multiple?: boolean;
}

const SelectBox = React.forwardRef<HTMLInputElement, SelectBoxProps>(
    (
        {
            inputPlaceholder,
            emptyPlaceholder,
            placeholder,
            className,
            options,
            value,
            onChange,
            multiple,
        },
        ref
    ) => {
        const [searchTerm, setSearchTerm] = React.useState<string>("");
        const [isOpen, setIsOpen] = React.useState(false);

        const handleSelect = (selectedValue: string) => {
            if (multiple) {
                const newValue =
                    value?.includes(selectedValue) && Array.isArray(value)
                        ? value.filter((v) => v !== selectedValue)
                        : // @ts-ignore
                          [...(value ?? []), selectedValue];
                onChange?.(newValue);
            } else {
                onChange?.(selectedValue);
                setIsOpen(false);
            }
        };

        const handleClear = () => {
            onChange?.(multiple ? [] : "");
        };

        return (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div
                        className={cn(
                            "bg-card flex min-h-[36px] cursor-pointer items-center justify-between rounded-md px-3 py-2 data-[state=open]:border-ring",
                            className
                        )}
                    >
                        <div
                            className={cn(
                                "items-center gap-1 overflow-hidden text-sm",
                                multiple
                                    ? "flex flex-grow flex-wrap "
                                    : "inline-flex whitespace-nowrap"
                            )}
                        >
                            {value || (value && Object.keys(value).length > 0) ? (
                                multiple ? (
                                    options
                                        .filter(
                                            (option) =>
                                                Array.isArray(value) && value.includes(option.value)
                                        )
                                        .map((option) => (
                                            <span
                                                key={option.value}
                                                className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            >
                                                <span>{option.label}</span>
                                                <span
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSelect(option.value);
                                                    }}
                                                    className="flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground"
                                                >
                                                    <X />
                                                </span>
                                            </span>
                                        ))
                                ) : (
                                    options.find((opt) => opt.value === value)?.label
                                )
                            ) : (
                                <span className="mr-auto text-muted-foreground">{placeholder}</span>
                            )}
                            {/* {JSON.stringify(value ? Object.keys(value).length : null)} */}
                        </div>
                        <div className="flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
                            {value && value.length > 0 ? (
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClear();
                                    }}
                                >
                                    <X className="size-4" />
                                </div>
                            ) : (
                                <div>
                                    <ChevronsUpDown className="size-4" />
                                </div>
                            )}
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                >
                    <Command>
                        <div className="relative">
                            <CommandInput
                                value={searchTerm}
                                onValueChange={(e) => setSearchTerm(e)}
                                ref={ref}
                                placeholder={inputPlaceholder ?? "Search..."}
                                className="h-9"
                            />
                            {searchTerm && (
                                <div
                                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <X className="size-4" />
                                </div>
                            )}
                        </div>
                        <CommandEmpty>{emptyPlaceholder ?? "No results found."}</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                <div className="max-h-64">
                                    {options.map((option) => {
                                        const isSelected =
                                            Array.isArray(value) && value.includes(option.value);
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                // value={option.value}
                                                onSelect={() => handleSelect(option.value)}
                                            >
                                                {multiple && (
                                                    <div
                                                        className={cn(
                                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                            isSelected
                                                                ? "bg-primary text-primary-foreground"
                                                                : "opacity-50 [&_svg]:invisible"
                                                        )}
                                                    >
                                                        <CheckIcon />
                                                    </div>
                                                )}
                                                <span>{option.label}</span>
                                                {!multiple && option.value === value && (
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto",
                                                            option.value === value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                )}
                                            </CommandItem>
                                        );
                                    })}
                                </div>
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

SelectBox.displayName = "SelectBox";

export default SelectBox;

{
    /* <PopoverContent className="w-full p-0" align="start" sticky="always">
                <Command className="w-full">
                    <CommandInput placeholder="Rechercher..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup className="w-full">
                        <CommandList className="w-full">
                            {options.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent> */
}
