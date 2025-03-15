import Icon from "@vape/components/Icon";
import { DecorateBuilder, FieldForm } from "@vape/types/modules/form";
import { Fragment, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import { isDecorateBuilder, isInputBuilder, isInputCustom } from "../condition";
import { useFormGeneral } from "../hook/useFormGeneral";
import { RenderCustom } from "./custom/Custom.render";
import { RenderDecorates } from "./decorate/Decorate.render";
import { RenderInputs } from "./input/Input.render";
import { RenderViews } from "./view/View.render";

export const RenderFields = ({
    fields,
    onlyRead,
    data,
}: {
    fields: FieldForm[];
    data?: Record<string, any>;
    onlyRead?: boolean;
}) => {
    const { watch } = useFormContext();
    const { authUser } = useFormGeneral();

    const mapFields: ReactElement[] = [];

    fields.map((field: FieldForm, index) => {
        let show = true;
        const messages: string[] = [];
        if (field.show) {
            show = false;
            field.show.map((condition) => {
                const value = watch(condition.watch);
                if (condition.notEgual && !condition.notEgual.includes(value)) {
                    show = true;
                } else if (condition.egual && condition.egual.includes(value)) {
                    show = true;
                } else {
                    condition.message && messages.push(condition.message);
                }
            });
        }
        if (show) {
            if (isInputCustom(field)) {
                if (onlyRead && data) {
                    if (field?.returnTypes) {
                        mapFields.push(
                            <RenderViews {...field} type={field.returnTypes} data={data} />
                        );
                    }
                } else {
                    mapFields.push(<RenderCustom {...field} authUser={authUser} />);
                }
            }
            if (isInputBuilder(field)) {
                if (onlyRead && data) {
                    mapFields.push(<RenderViews key={index} {...field} data={data} />);
                } else {
                    mapFields.push(<RenderInputs key={index} {...field} />);
                }
            }

            if (isDecorateBuilder(field)) {
                mapFields.push(
                    <RenderDecorates
                        key={index}
                        data={data}
                        onlyRead={true}
                        {...(field as DecorateBuilder)}
                    />
                );
            }
        } else if (messages.length > 0) {
            mapFields.push(
                <>
                    {messages?.map((message, index) => (
                        <div key={index} className="col-span-full">
                            <div className="w-full flex gap-2 items-center text-yellow-500 text-sm">
                                <Icon name="info" />
                                <span>{message}</span>
                            </div>
                        </div>
                    ))}
                </>
            );
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
