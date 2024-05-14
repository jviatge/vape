import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconProps } from "@vape/components/Icon";
import { resolveColumnsClass } from "@vape/lib/resolveGrid";
import { useFormContext } from "react-hook-form";
import { RenderFields } from "../../RenderFields";
import { FieldBuilder } from "../../renderFields.type";
import { BaseDecorate } from "../DecorateRender.type";

export interface DecorateContainerProps extends BaseDecorate {
    type: "container";
    description?: string;
    icon?: IconProps["name"];
    fields: FieldBuilder[];
    noBorder?: boolean;
}

const ContainerDecorate = (props: DecorateContainerProps) => {
    const form = useFormContext();

    let show = true;
    if (props.show) {
        show = false;
        props.show.map((condition) => {
            const value = form.watch(condition.watch);
            if (condition.notEgual && !condition.notEgual.includes(value)) show = true;
            if (condition.egual && condition.egual.includes(value)) show = true;
        });
    }

    if (!props.fields || !show) return null;

    if (props.noBorder)
        return (
            <div className={resolveColumnsClass(props.col ?? 4, props.gap ?? 5)}>
                <RenderFields fields={props.fields} data={props.data} onlyRead={props.onlyRead} />
            </div>
        );

    return (
        <Card className="w-full p-3 bg-transparent space-y-4 grid">
            {props.label ? (
                <CardHeader className={"mb-2 py-3"}>
                    <CardTitle>
                        <span className={"flex"}>
                            {props.icon ? (
                                <Icon name={props.icon} className={"mr-2 text-primary"} />
                            ) : null}
                            {props.label}
                        </span>
                        {props.description ? (
                            <CardDescription>{props.description}</CardDescription>
                        ) : null}
                    </CardTitle>
                </CardHeader>
            ) : null}
            <CardContent className={resolveColumnsClass(props.col ?? 4, props.gap ?? 5)}>
                <RenderFields fields={props.fields} data={props.data} onlyRead={props.onlyRead} />
            </CardContent>
        </Card>
    );
};

export { ContainerDecorate };
