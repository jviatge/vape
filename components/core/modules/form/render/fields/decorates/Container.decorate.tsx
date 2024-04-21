import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconProps } from "@vape/components/Icon";
import { Col, Gap, resolveColumnsClass } from "@vape/lib/resolveGrid";
import { FieldBuilder, RenderFields } from "../../../RenderFields";

const ContainerDecorate = ({
    fieldBuilders,
    form,
    label,
    description,
    icon,
    col,
    gap,
    noBorder,
}: {
    fieldBuilders: FieldBuilder[];
    form: any;
    label?: string;
    description?: string;
    icon?: IconProps["name"];
    col?: Col;
    gap?: Gap;
    noBorder?: boolean;
}) => {
    if (noBorder)
        return (
            <div className={resolveColumnsClass(col ?? 4, gap ?? 5)}>
                <RenderFields fieldBuilders={fieldBuilders} form={form} />
            </div>
        );

    return (
        <Card className="w-full p-3 bg-transparent space-y-4 grid">
            {label ? (
                <CardHeader className={"mb-5 py-3"}>
                    <CardTitle>
                        <span className={"flex"}>
                            {icon ? <Icon name={icon} className={"mr-2 text-primary"} /> : null}
                            {label}
                        </span>
                        {description ? <CardDescription>{description}</CardDescription> : null}
                    </CardTitle>
                </CardHeader>
            ) : null}
            <CardContent className={resolveColumnsClass(col ?? 4, gap ?? 5)}>
                <RenderFields fieldBuilders={fieldBuilders} form={form} />
            </CardContent>
        </Card>
    );
};

export { ContainerDecorate };
