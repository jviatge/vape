import { useFormContext } from "react-hook-form";
import { isNotDecorateBuilder } from "../../lib/condition";
import { useFormGeneral } from "../hook/useFormGeneral";
import { RenderMessage } from "./RenderMessage";
import { RenderCustom } from "./custom/Custom.render";
import { RenderDecorates } from "./decorate/Decorate.render";
import { RenderInputs } from "./input/Input.render";
import { FieldBuilder } from "./renderFields.type";
import { RenderViews } from "./view/View.render";

export const RenderFields = ({
    fields,
    onlyRead,
    data,
}: {
    fields: FieldBuilder[];
    data?: Record<string, any>;
    onlyRead?: boolean;
}) => {
    const { watch } = useFormContext();
    const { authUser } = useFormGeneral();

    return fields.map((field, index) => {
        let show = true;
        const messages: string[] = [];
        if (field.show) {
            show = false;
            field.show.map((condition) => {
                const value = watch(condition.watch);
                if (condition.notEgual && !condition.notEgual.includes(value)) {
                    show = true;
                } else {
                    condition.message && messages.push(condition.message);
                }
                if (condition.egual && condition.egual.includes(value)) {
                    show = true;
                } else {
                    condition.message && messages.push(condition.message);
                }
            });
        }
        if (show) {
            if (field.type === "custom") {
                if (onlyRead && data) {
                    if (field.returnTypes) {
                        return (
                            <RenderViews
                                key={index}
                                {...field}
                                type={field.returnTypes}
                                data={data}
                            />
                        );
                    }
                } else {
                    return <RenderCustom key={index} {...field} authUser={authUser} />;
                }
            }
            if (isNotDecorateBuilder(field)) {
                if (onlyRead && data) {
                    return <RenderViews key={index} {...field} data={data} />;
                } else {
                    return <RenderInputs key={index} {...field} />;
                }
            } else {
                if (field.type !== "custom") {
                    return <RenderDecorates key={index} data={data} onlyRead={true} {...field} />;
                }
            }
        } else {
            if (messages.length > 0) {
                return <RenderMessage key={index} messages={messages} span={field.span} />;
            } else {
                return null;
            }
        }
    });
};
