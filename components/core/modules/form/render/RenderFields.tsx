import { useFormContext } from "react-hook-form";
import { isNotDecorateBuilder } from "../../lib/condition";
import { RenderCustom } from "./custom/Custom.render";
import { RenderDecorates } from "./decorate/Decorate.render";
import { RenderInputs } from "./input/Input.render";
import { FieldBuilder } from "./renderFields.type";

export const RenderFields = ({ fields }: { fields: FieldBuilder[] }) => {
    const { watch } = useFormContext();

    return fields.map((field, index) => {
        let show = true;
        if (field.show) {
            show = false;
            field.show.map((condition) => {
                const value = watch(condition.watch);
                if (condition.notEgual && !condition.notEgual.includes(value)) show = true;
                if (condition.egual && condition.egual.includes(value)) show = true;
            });
        }
        if (show) {
            if (field.type === "custom") {
                return <RenderCustom key={index} {...field} />;
            }
            if (isNotDecorateBuilder(field)) {
                return <RenderInputs key={index} {...field} />;
            } else {
                return <RenderDecorates key={index} {...field} />;
            }
        }
        return null;
    });
};
