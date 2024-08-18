"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigTheme } from "@vape/actions/config";
import { queryClient } from "@vape/lib/queryClient";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RouteChangesProvider } from "../modules/form/hook/useRouteChangeEvents";

interface Props {
    children: ReactNode;
    configThemes: ConfigTheme[];
}

const RootProvider = ({ children, configThemes }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <RouteChangesProvider>
                    <TransitionProvider>
                        <ThemeProvider
                            configThemes={configThemes}
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                    </TransitionProvider>
                </RouteChangesProvider>
            </SessionProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default RootProvider;
