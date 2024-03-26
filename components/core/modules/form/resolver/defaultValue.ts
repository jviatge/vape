import { FormBuilder } from "../Form.module";

export const defaultValues = (data: Record<string, any>, formBuilder: FormBuilder) => {
    const values: Record<string, any> = {};

    formBuilder.fields.map((field) => {
        switch (field.type) {
            case "date":
                values[field.name] = data
                    ? new Date(data[field.name]).toISOString().split("T")[0] ?? ""
                    : "";
                break;

            default:
                values[field.name] = data ? data[field.name] ?? "" : "";
                break;
        }
    });

    return values;
};
