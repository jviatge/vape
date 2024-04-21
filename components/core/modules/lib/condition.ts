import { FieldBuilder } from "../form/RenderFields";
import { InputBuilder } from "../form/render/Inputs.render";

export const isNotDecorateBuilder = (field: FieldBuilder): field is InputBuilder => {
    return field.type !== "container" && field.type !== "sections";
};

export const isDecoaorateBuilderWithFields = (field: FieldBuilder) => {
    return field.fields && (field.type === "container" || field.type === "sections");
};
