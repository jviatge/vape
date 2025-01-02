import { Col, Gap } from "@vape/lib/resolveGrid";

export declare interface BaseDecorate extends baseField {
    col?: Col;
    gap?: Gap;
    data?: Record<string, any>;
    onlyRead?: boolean;
}

export declare interface DecorateSectionProps extends BaseDecorate {
    type: "sections";
    tabs: {
        label: string;
        name: string;
        description?: string;
        disabled?: boolean;
        fields: FieldBuilder[];
    }[];
}

export declare type DecorateContainerProps = {
    type: "container";
    description?: string;
    icon?: IconProps["name"];
    fields: FieldBuilder[];
    noBorder?: boolean;
} & BaseDecorate;
