import { getThemes } from "@vape/actions/config";
import RootProvider from "@vape/components/providers/Root.provider";
import { ThemeProvider } from "@vape/components/providers/Theme.provider";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: [{ rel: "icon", url: "../../assets/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const configThemes = await getThemes();
    return (
        <html lang="fr">
            <head>
                <link rel="icon" href="/assets/favicon.ico" sizes="any" />
            </head>
            <body suppressHydrationWarning={true}>
                <NextTopLoader zIndex={1600} showSpinner={false} height={5} />
                <ThemeProvider
                    configThemes={configThemes}
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <RootProvider configThemes={configThemes}>{children}</RootProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
