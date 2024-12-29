import { DecorateBuilder, FieldForm, InputBuilder, InputCustom } from "@vape/types/modules/form";

export const isInputBuilder = (field: FieldForm): field is InputBuilder => {
    return field.type !== "container" && field.type !== "sections" && field.type !== "custom";
};

export const isInputCustom = (field: FieldForm): field is InputCustom => {
    return field.type === "custom";
};

export const isDecorateBuilder = (field: FieldForm): field is DecorateBuilder => {
    return field.type === "container" || field.type === "sections";
};
