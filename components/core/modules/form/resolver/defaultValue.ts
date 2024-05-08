import { isNotDecorateBuilder } from "../../lib/condition";
import { InputBuilder } from "../render/input/InputRender.type";
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
        } else if (isNotDecorateBuilder(field)) {
            values = getDefaultValueByKey(data, field, values);
        }
    });
    return values;
};

const getDefaultValueByKey = (
    data: Record<string, any> | undefined,
    field: InputBuilder,
    values: Record<string, any>
) => {
    switch (field.type) {
        case "checkbox":
        case "switch":
            values[field.name] = data ? data[field.name] ?? false : false;
            break;

        case "manyToOne":
            values[field.name] = data ? data[field.name] ?? {} : {};
            break;

        default:
            values[field.name] = data ? data[field.name] ?? "" : "";
            break;
    }

    return values;
};
