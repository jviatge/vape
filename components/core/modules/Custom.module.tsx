"use client";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
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

    const query = useQuery<any>({
        enabled: props.model !== undefined && props.modelMethod !== undefined,
        queryKey: [
            props.model,
            {
                custom: true,
            },
        ],
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
        <Card className="relative w-full flex justify-center items-center overflow-hidden">
            {query.isLoading ? (
                <Loading />
            ) : (
                <DynamicComponent
                    /* @ts-ignore  */
                    props={{
                        authUser: props.authUser,
                        query,
                    }}
                />
            )}
        </Card>
    );
};
