"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export const RenderCustom = (props: { component: string; row: Record<string, any> }) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(() => import(`../../../../../../../modules/${props.component}`), {
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
