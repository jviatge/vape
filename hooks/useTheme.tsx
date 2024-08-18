"use client";

import { ConfigTheme } from "@vape/actions/config";
import { useEffect, useState } from "react";

export default function useTheme(theme: string, themes: ConfigTheme[]) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) return;
        const head = document.head || document.getElementsByTagName("head")[0];
        const style = document.createElement("style");
        const getTheme = themes.find((t) => t.name === theme);

        if (getTheme) {
            head.appendChild(style);

            const css = `
                    :root {${getTheme.root}}
                    .dark {${getTheme.dark}}
                `;

            style.type = "text/css";
            // @ts-ignore
            if (style.styleSheet) {
                // @ts-ignore
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
        }
        setIsLoaded(true);
    }, [theme]);

    return { isLoaded };
}
