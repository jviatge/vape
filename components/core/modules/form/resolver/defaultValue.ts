import { FormBuilder } from "../Form.module";

export const defaultValues = (data: Record<string, any>, formBuilder: FormBuilder) => {
    const values: Record<string, any> = {};

    formBuilder.fields.map((field) => {
        switch (field.type) {
            case "checkbox":
            case "switch":
                values[field.name] = data ? data[field.name] ?? false : false;
                break;

            default:
                values[field.name] = data ? data[field.name] ?? "" : "";
                break;
        }
    });

    return values;
};
