"use client";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { Loading } from "@vape/tools";
import { InputCustom } from "@vape/types/modules/form";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const RenderCustom = (props: InputCustom) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(() => import(`../../../../../../modules/${props.component}`), {
                ssr: false,
                loading: () => (
                    <div className="flex justify-center items-center w-full">
                        <Loading />
                    </div>
                ),
            }),
        [props.component]
    );

    const query = useQuery<any>({
        enabled: props.model && props.modelMethod ? true : false,
        queryKey: [props.model, props.modelMethod, "field"],
        staleTime: 0,
        queryFn: () =>
            queryGetByModule({
                model: props.model,
                searchInputField: [],
                query: {
                    get: props.modelMethod,
                },
            }).then((res) => res.data),
    });

    return (
        <div className={`space-y-2 flex flex-col relative ${resolveSpanClass(props.span)}`}>
            <DynamicComponent
                /* @ts-ignore  */
                props={{
                    query,
                    customBuilder: props,
                    authUser: props.authUser,
                    type: "field",
                }}
            />
        </div>
    );
};
