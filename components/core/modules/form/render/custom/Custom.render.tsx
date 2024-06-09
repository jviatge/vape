"use client";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { Loading } from "@vape/tools";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { CustomBuilder } from "./CustomRender.type";

export const RenderCustom = (customBuilder: CustomBuilder) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(() => import(`../../../../../../../modules/${customBuilder.component}`), {
                ssr: false,
                loading: () => (
                    <div className="flex justify-center items-center w-full h-full">
                        <Loading />
                    </div>
                ),
            }),
        [customBuilder.component]
    );

    const query = useQuery<any>({
        enabled: customBuilder.model !== undefined && customBuilder.modelMethod !== undefined,
        queryKey: [
            customBuilder.model,
            {
                custom: true,
            },
        ],
        staleTime: 0,
        queryFn: () =>
            queryGetByModule({
                model: customBuilder.model,
                searchInputField: [],
                query: {
                    get: customBuilder.modelMethod,
                },
            }).then((res) => res.data),
    });

    return (
        <div className={`flex flex-col relative ${resolveSpanClass(customBuilder.span)}`}>
            <DynamicComponent
                /* @ts-ignore  */
                props={{
                    query,
                    customBuilder,
                    authUser: customBuilder.authUser,
                    type: "field",
                }}
            />
        </div>
    );
};
