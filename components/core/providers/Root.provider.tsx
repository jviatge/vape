"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@vape/lib/queryClient";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RouteChangesProvider } from "../modules/form/hook/useRouteChangeEvents";

interface Props {
    children: ReactNode;
}

const RootProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SessionProvider>
                    <RouteChangesProvider>{children}</RouteChangesProvider>
                </SessionProvider>
                <Toaster />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default RootProvider;
