import { isNotDecorateBuilder } from "../../lib/condition";
import { FieldBuilder } from "../RenderFields";
import { InputBuilder } from "../render/Inputs.render";

export const defaultValues = (
    data: Record<string, any>,
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
    data: Record<string, any>,
    field: InputBuilder,
    values: Record<string, any>
) => {
    switch (field.type) {
        case "checkbox":
        case "switch":
            values[field.name] = data ? data[field.name] ?? false : false;
            break;

        case "oneToOne":
            data &&
                data[field.name] &&
                field.fields &&
                (values[field.name] = defaultValues(data[field.name], field.fields));
            break;

        default:
            values[field.name] = data ? data[field.name] ?? "" : "";
            break;
    }

    return values;
};
