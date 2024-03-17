import { Input } from "@/components/ui/input";
import { cn } from "@vape/lib/utils";
import { FieldTable } from "@vape/types/modules/table/table";
import { X } from "lucide-react";
import { useState } from "react";
import { SetQueryValue } from "../../../context/Table.context";

const ContainsFilter = ({
    field,
    valuesFields,
    setQueryValue,
    type,
    disabled,
}: {
    field: FieldTable;
    valuesFields: Record<string, string>;
    setQueryValue: SetQueryValue;
    type?: "number" | "text";
    disabled?: boolean;
}) => {
    const [value, setValue] = useState<string>(valuesFields[field.name] ?? "");

    const typeFilter = type === "text" ? "contains" : "equals";

    const handleChangeValueInInput = (value?: string) => {
        return value
            ? setQueryValue(typeFilter, "add", field.name, value as string)
            : setQueryValue(typeFilter, "delete", field.name);
    };

    return (
        <>
            {valuesFields[field.name] ? (
                <button
                    disabled={disabled}
                    onClick={(e) => {
                        e.preventDefault();
                        setValue("");
                        handleChangeValueInInput();
                    }}
                    type={"button"}
                    className={cn(
                        "hover:text-white absolute right-0 cursor-pointer rounded-full top-1/2 -translate-y-2 -translate-x-2 hover:bg-destructive/80",
                        type === "number" && "mr-8"
                    )}
                >
                    <X className="w-4 h-4" />
                </button>
            ) : null}

            <Input
                {...(type === "number" && {
                    min: 0,
                })}
                disabled={disabled}
                type={type ?? "text"}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleChangeValueInInput(value);
                    }
                }}
                onChange={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                }}
                value={
                    value
                    /* ? value
                        : valuesFields[field.name]
                        ? valuesFields[field.name].replace("[contains]:", "")
                        : "" */
                }
                name={field.name}
                className="w-full"
            />
        </>
    );
};

export { ContainsFilter };
