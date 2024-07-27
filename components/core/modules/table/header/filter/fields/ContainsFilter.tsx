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
    const resolveValue = () => {
        if (valuesFields[field.name]) {
            if (Object.prototype.toString.apply(valuesFields[field.name])) {
                const value =
                    /* @ts-ignore */
                    valuesFields[field.name].OR[0][
                        /* @ts-ignore */
                        Object.keys(valuesFields[field.name].OR[0])[0]
                    ].contains;

                return value;
            }
            return valuesFields[field.name];
        }
        return "";
    };

    const [value, setValue] = useState<string>(resolveValue());

    const typeFilter = type === "text" ? "contains" : "equals";

    const handleChangeValueInInput = (value?: string) => {
        if (field.keys && field.keys.length > 0) {
            return value
                ? setQueryValue(
                      typeFilter,
                      "add",
                      field.name + "." + field.keys.join("|"),
                      value as string
                  )
                : setQueryValue(typeFilter, "delete", field.name + "." + field.keys.join("|"));
        }
        return value
            ? setQueryValue(typeFilter, "add", field.name, value as string)
            : setQueryValue(typeFilter, "delete", "client.last_name|first_name");
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
                className="w-full px-2 bg-background hover:bg-accent hover:text-accent-foreground"
            />
        </>
    );
};

export { ContainsFilter };
