"use client";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
import { Card } from "@vape/components/ui/card";
import { Loading } from "@vape/components/ui/loading";
import { CustomBuilder } from "@vape/types/modules/custom";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { TransitionProvider } from "../providers/Transition.provider";

export const CustomModule = (props: CustomBuilder) => {
    const DynamicComponent = useMemo(
        () =>
            dynamic(() => import(`../../../modules/${props.component}`), {
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
        queryKey: [props.model, props.modelMethod],
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
        <TransitionProvider>
            {props.noCard ? (
                <div className="relative w-full flex justify-center items-center overflow-hidden">
                    {query.isLoading ? (
                        <Loading />
                    ) : (
                        <DynamicComponent
                            /* @ts-ignore  */
                            props={{
                                authUser: props.authUser,
                                query,
                                type: "module",
                            }}
                        />
                    )}
                </div>
            ) : (
                <Card className="relative w-full flex justify-center items-center overflow-hidden">
                    {query.isLoading ? (
                        <Loading />
                    ) : (
                        <DynamicComponent
                            /* @ts-ignore  */
                            props={{
                                authUser: props.authUser,
                                query,
                                type: "module",
                            }}
                        />
                    )}
                </Card>
            )}
        </TransitionProvider>
    );
};
