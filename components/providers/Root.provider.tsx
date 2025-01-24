"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigTheme } from "@vape/actions/config";
import { queryClient } from "@vape/lib/queryClient";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RouteChangesProvider } from "../modules/form/hook/useRouteChangeEvents";
import { TransitionProvider } from "./Transition.provider";
import { TranslationProvider } from "./Translation.provider";

interface Props {
    children: ReactNode;
    configThemes: ConfigTheme[];
}

const RootProvider = ({ children, configThemes }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <TranslationProvider>
                <TransitionProvider>
                    <SessionProvider>
                        <RouteChangesProvider>
                            {children}
                            <Toaster />
                        </RouteChangesProvider>
                    </SessionProvider>
                </TransitionProvider>
            </TranslationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default RootProvider;
