import { isNotDecorateBuilder } from "../../lib/condition";
import { FieldBuilder } from "../render/renderFields.type";

export const defaultValues = (
    data: Record<string, any> | undefined,
    fieldsBuilder: FieldBuilder[],
    entryValues?: Record<string, any>
) => {
    let values = entryValues ?? {};

    fieldsBuilder.map((field) => {
        if (field.type === "container" && field.fields) {
            values = defaultValues(data, field.fields, values);
        } else if (field.type === "sections" && field.tabs) {
            field.tabs.map((tab) => {
                values = defaultValues(data, tab.fields, values);
            });
        } else if (field.type === "custom" && field.name && field.returnTypes) {
            values = getDefaultValueByKey(
                data,
                field.name,
                field.returnTypes,
                field.defaultValue,
                values
            );
        } else if (isNotDecorateBuilder(field)) {
            values = getDefaultValueByKey(data, field.name, field.type, field.defaultValue, values);
        }
    });
    return values;
};

const getDefaultValueByKey = (
    data: Record<string, any> | undefined,
    name: string,
    type: FieldBuilder["type"],
    defaultValues: any,
    values: Record<string, any>
) => {
    switch (type) {
        case "checkbox":
        case "switch":
            values[name] = data && data[name] ? data[name] : defaultValues ? defaultValues : false;
            break;

        case "date":
            values[name] =
                data && data[name]
                    ? data[name]
                    : defaultValues
                    ? defaultValues === "now"
                        ? new Date()
                        : new Date(defaultValues)
                    : undefined;
            break;

        case "manyToOne":
            values[name] = data && data[name] ? data[name] : defaultValues ? defaultValues : {};
            break;

        default:
            values[name] = data && data[name] ? data[name] : defaultValues ? defaultValues : "";
            break;
    }

    return values;
};
