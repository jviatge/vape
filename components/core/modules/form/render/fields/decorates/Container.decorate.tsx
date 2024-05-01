import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@vape/components/Icon";
import { resolveColumnsClass } from "@vape/lib/resolveGrid";
import { useFormContext } from "react-hook-form";
import { RenderFields } from "../../../RenderFields";
import { DecorateBuilder } from "../../Decorates.render";

export type DecorateContainerProps = {
    description?: string;
};

const ContainerDecorate = (props: DecorateBuilder & DecorateContainerProps) => {
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
                <RenderFields fieldBuilders={props.fields} form={form} />
            </div>
        );

    return (
        <Card className="w-full p-3 bg-transparent space-y-4 grid">
            {props.label ? (
                <CardHeader className={"mb-5 py-3"}>
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
                <RenderFields fieldBuilders={props.fields} form={form} />
            </CardContent>
        </Card>
    );
};

export { ContainerDecorate };