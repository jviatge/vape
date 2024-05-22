import { MultiSelect } from "@/components/ui/MultiSelect";
import { FilterSelect } from "@vape/types/modules/table/filterTable";
import { FieldTable } from "@vape/types/modules/table/table";
import { SetQueryValue } from "../../../context/Table.context";

type Props = {
    field: FieldTable;
    valuesFields: Record<string, string>;
    setQueryValue: SetQueryValue;
    disabled?: boolean;
};

const SelectFilter = ({ field, valuesFields, setQueryValue, disabled }: Props) => {
    const filter = field.filter as FilterSelect;

    return (
        <MultiSelect
            disabled={disabled}
            onChange={(value) => {
                value.length > 0
                    ? // @ts-ignore
                      setQueryValue("select", "add", field.name, value.join(","))
                    : setQueryValue("select", "delete", field.name);
            }}
            options={filter.options.map((option) => ({
                value: option.value,
                label: option.minLabel ?? option.label,
                color: option.color,
            }))}
            selected={valuesFields[field.name] ? valuesFields[field.name].split(",") : []}
            className="w-full"
        />
    );
};

export { SelectFilter };
