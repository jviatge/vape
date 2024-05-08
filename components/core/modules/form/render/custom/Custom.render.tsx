"use client";

import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { Loading } from "@vape/tools";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CustomBuilder } from "./CustomRender.type";

export const RenderCustom = (customBuilder: CustomBuilder) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(
                () => import(`../../../../../../../modules/fields/${customBuilder.component}`),
                {
                    ssr: false,
                    loading: () => (
                        <div className="flex justify-center items-center w-full h-full">
                            <Loading />
                        </div>
                    ),
                }
            ),
        [customBuilder.component]
    );

    const form = useFormContext();

    return (
        <div className={`flex flex-col relative ${resolveSpanClass(customBuilder.span)}`}>
            <DynamicComponent
                /* @ts-ignore  */
                props={{
                    customBuilder,
                    form,
                }}
            />
        </div>
    );
};

/* - Nom 
- Prémon 
- Parcours
- Bateau
- Heure d'arriver
- Nombre de personne */

// 80min
