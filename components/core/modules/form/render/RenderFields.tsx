import { Fragment, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { isNotDecorateBuilder } from "../../lib/condition";
import { useFormGeneral } from "../hook/useFormGeneral";
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

    const mapFields: ReactElement[] = [];

    fields.map((field, index) => {
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
                        mapFields.push(
                            <RenderViews {...field} type={field.returnTypes} data={data} />
                        );
                    }
                } else {
                    mapFields.push(<RenderCustom {...field} authUser={authUser} />);
                }
            }
            if (isNotDecorateBuilder(field)) {
                /*  if (onlyRead && data) {
                    mapFields.push(<RenderViews {...field} data={data} />);
                } else {
                    mapFields.push(<RenderInputs {...field} />);
                } */
                mapFields.push(<RenderInputs key={index} {...field} />);
            } else {
                if (field.type !== "custom") {
                    mapFields.push(
                        <RenderDecorates key={index} data={data} onlyRead={true} {...field} />
                    );
                }
            }
        } else {
            if (messages.length > 0) {
                /* mapFields.push(<RenderMessage messages={messages} span={field.span} />); */
            }
        }
    });

    return (
        <>
            {mapFields.map((field, index) => (
                <Fragment key={index}>{field}</Fragment>
            ))}
        </>
    );
};
