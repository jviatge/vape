import { InputBuilder } from "../form/render/input/InputRender.type";
import { FieldBuilder } from "../form/render/renderFields.type";

export const isNotDecorateBuilder = (field: FieldBuilder): field is InputBuilder => {
    return field.type !== "container" && field.type !== "sections" && field.type !== "custom";
};
