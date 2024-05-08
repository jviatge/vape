"use client";

import { Card } from "@vape/components/ui/card";
import { Loading } from "@vape/components/ui/loading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CustomBuilder } from "./form/render/custom/CustomRender.type";

export const CustomModule = (props: CustomBuilder) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(() => import(`../../../../modules/${props.component}`), {
                loading: () => (
                    <div className="flex justify-center items-center w-full h-full">
                        <Loading />
                    </div>
                ),
            }),
        [props.component]
    );

    return (
        <Card
            className="relative w-full p-3 flex justify-center items-center"
            style={{
                height: "50vh",
            }}
        >
            <DynamicComponent />
        </Card>
    );
};
