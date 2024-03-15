import { cn } from "@/lib/utils";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Loading } from "@/components/ui/loading";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";

export type OptionType = {
    label: string;
    value: string;
    color?: string;
};

interface MultiSelectProps {
    options?: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

function MultiSelect({
    disabled,
    options,
    selected,
    onChange,
    className,
    onClick,
    isLoading,
    ...props
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item));
    };

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${
                        selected.length > 1 && !isLoading ? "h-full" : "h-10"
                    }`}
                    onClick={() => {
                        onClick && onClick();
                        setOpen(!open);
                    }}
                >
                    <div className="flex gap-1 flex-wrap">
                        {isLoading && selected.length > 0 ? (
                            <Loading className={"w-10 h-10"} />
                        ) : (
                            <>
                                {options
                                    ? selected.map((item) => {
                                          const optionResolved = options.find(
                                              (option) => option.value === item
                                          );

                                          return (
                                              <Badge
                                                  style={{ backgroundColor: optionResolved?.color }}
                                                  variant="default"
                                                  key={item}
                                                  className="mr-1 mb-1 text-muted-foreground"
                                                  onClick={() => handleUnselect(item)}
                                              >
                                                  {optionResolved?.label}
                                                  <div
                                                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                      onKeyDown={(e) => {
                                                          if (e.key === "Enter") {
                                                              handleUnselect(item);
                                                          }
                                                      }}
                                                      onMouseDown={(e) => {
                                                          e.preventDefault();
                                                          e.stopPropagation();
                                                      }}
                                                      onClick={() => handleUnselect(item)}
                                                  >
                                                      <X className="h-3 w-3 hover:text-foreground" />
                                                  </div>
                                              </Badge>
                                          );
                                      })
                                    : null}
                            </>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    {isLoading ? (
                        <CommandGroup className="max-h-64 overflow-auto">
                            <CommandItem>
                                <Loading />
                            </CommandItem>
                        </CommandGroup>
                    ) : (
                        <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                                {options
                                    ? options.map((option) => (
                                          <CommandItem
                                              disabled={disabled}
                                              className={"cursor-pointer"}
                                              key={option.value}
                                              onSelect={() => {
                                                  onChange(
                                                      selected.includes(option.value)
                                                          ? selected.filter(
                                                                (item) => item !== option.value
                                                            )
                                                          : [...selected, option.value]
                                                  );
                                                  setOpen(true);
                                              }}
                                          >
                                              <Check
                                                  className={cn(
                                                      "mr-2 h-4 w-4",
                                                      selected.includes(option.value)
                                                          ? "opacity-100"
                                                          : "opacity-0"
                                                  )}
                                              />
                                              {option.label}
                                          </CommandItem>
                                      ))
                                    : null}
                            </CommandGroup>
                        </CommandList>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export { MultiSelect };
