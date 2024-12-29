import { DecorateBuilder, Field, InputBuilder, InputCustom } from "@vape/types/modules/form";

export const isInputBuilder = (field: Field): field is InputBuilder => {
    return field.type !== "container" && field.type !== "sections" && field.type !== "custom";
};

export const isInputCustom = (field: Field): field is InputCustom => {
    return field.type === "custom";
};

export const isDecorateBuilder = (field: Field): field is DecorateBuilder => {
    return field.type === "container" || field.type === "sections";
};
