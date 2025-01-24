"use client";

import { Loading } from "@/components/ui/loading";
import { ConfigTheme } from "@vape/actions/config";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import localStorage from "../../hooks/useLocalStorage";
import useTheme from "../../hooks/useTheme";

export function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps & {
    configThemes: ConfigTheme[];
}) {
    const [themeSelected] = localStorage<string>("theme-color");
    const { isLoaded } = useTheme(themeSelected, props.configThemes);

    return isLoaded ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
    ) : (
        <div className="h-screen w-screen flex justify-center items-center">
            <Loading />
        </div>
    );
}
