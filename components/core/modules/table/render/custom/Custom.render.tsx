"use client";

import loadable from "@loadable/component";
import { useMemo } from "react";

export const RenderCustom = (props: { component: string; row: Record<string, any> }) => {
    const DynamicComponent = useMemo(
        () =>
            loadable(() => import(`../../../../../../../modules/${props.component}`), {
                ssr: false,
            }),
        [props.component]
    );

    return (
        <DynamicComponent
            /* @ts-ignore  */
            props={{
                ...props,
            }}
        />
    );
};
