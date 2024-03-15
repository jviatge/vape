import { Switch } from "@vape/components/ui/switch";
import { FieldTable } from "@vape/types/modules/table/table";
import { SetQueryValue } from "../../../context/Table.context";

type Props = {
    field: FieldTable;
    valuesFields: Record<string, boolean>;
    setQueryValue: SetQueryValue;
    disabled?: boolean;
};

const BooleanFilter = ({ field, valuesFields, setQueryValue, disabled }: Props) => {
    return (
        <Switch
            disabled={disabled}
            checked={valuesFields[field.name] ?? false}
            onClick={() => {
                if (valuesFields[field.name]) {
                    setQueryValue("boolean", "delete", field.name);
                } else {
                    setQueryValue("boolean", "add", field.name, true);
                }
            }}
        />
    );
};

export { BooleanFilter };
