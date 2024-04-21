import { UseFormReturn } from "react-hook-form";
import { isNotDecorateBuilder } from "../lib/condition";
import { DecorateBuilder, RenderDecorates } from "./render/Decorates.render";
import { InputBuilder, RenderInputs } from "./render/Inputs.render";

export type FieldBuilder = DecorateBuilder | InputBuilder;

export const RenderFields = ({
    fieldBuilders,
    form,
    addPrefix,
}: {
    fieldBuilders: FieldBuilder[];
    form: UseFormReturn<any, any, undefined>;
    addPrefix?: string;
}) => {
    return fieldBuilders.map((field, index) => {
        if (isNotDecorateBuilder(field)) {
            return (
                <RenderInputs
                    addPrefix={addPrefix}
                    key={index}
                    form={form}
                    fieldBuilder={field as InputBuilder}
                    span={field.span}
                />
            );
        }
        return (
            <RenderDecorates
                key={index}
                decorateBuilder={field as DecorateBuilder}
                span={field.span}
                form={form}
            />
        );
    });
};
