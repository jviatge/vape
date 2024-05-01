import { UseFormReturn, useFormContext } from "react-hook-form";
import { isNotDecorateBuilder } from "../lib/condition";
import { DecorateBuilder, RenderDecorates } from "./render/Decorates.render";
import { InputBuilder, RenderInputs } from "./render/Inputs.render";

export type FieldBuilder = DecorateBuilder | InputBuilder;

export const RenderFields = ({
    fieldBuilders,
    form,
    addPrefix,
    noFormOnlyRead,
}: {
    fieldBuilders: FieldBuilder[];
    form: UseFormReturn<any, any, undefined>;
    addPrefix?: string;
    noFormOnlyRead?: boolean;
}) => {
    const { watch } = useFormContext();

    if (noFormOnlyRead) {
    }

    return fieldBuilders.map((field, index) => {
        if (isNotDecorateBuilder(field)) {
            let show = true;
            if (field.show) {
                show = false;
                field.show.map((condition) => {
                    const value = watch(
                        addPrefix ? `${addPrefix}.${condition.watch}` : condition.watch
                    );
                    if (condition.notEgual && !condition.notEgual.includes(value)) show = true;
                    if (condition.egual && condition.egual.includes(value)) show = true;
                });
            }
            if (show) {
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
            return null;
        } else {
            return (
                <RenderDecorates
                    key={index}
                    decorateBuilder={field as DecorateBuilder}
                    span={field.span}
                    form={form}
                />
            );
        }
    });
};
