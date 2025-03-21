"use server";

import { VapeConfig } from "@vape/types/configs";
import fs from "fs";

export type ConfigTheme = {
    name: string;
    root: string;
    dark: string;
};

export const getVapeConfig = async (): Promise<VapeConfig> => {
    try {
        return await import("~/configs/general").then((module) => module.default);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting config");
    }
};

export const getListThemes = async (): Promise<string[]> => {
    try {
        const themes = await getThemes();
        return themes.map((theme) => theme.name);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting themes list");
    }
};

export const getThemes = async (): Promise<ConfigTheme[]> => {
    function parseCSSVariables(cssContent: string): string {
        return decodeURIComponent(escape(cssContent)).replace("\n", "").replace(/\s/g, " ");
    }

    try {
        const defaultTheme = fs.readFileSync("./themes/default.css", "utf8");
        let themes: ConfigTheme[] = [
            {
                name: "default",
                root: defaultTheme.match(/\:root\s*{([^}]*)}/)?.[1] || "",
                dark: defaultTheme.match(/\.dark\s*{([^}]*)}/)?.[1] || "",
            },
        ];
        const filenames = fs.readdirSync("../themes");
        const acceptedExtensions = ["css"];
        filenames.map((file) => {
            if (!acceptedExtensions.includes(file.split(".")[1])) return;
            const nameTheme = file.split(".")[0];
            const content = fs.readFileSync(`../themes/${file}`, "utf8");
            const rootBlock = content.match(/\:root\s*{([^}]*)}/)?.[1] || "";
            const darkBlock = content.match(/\.dark\s*{([^}]*)}/)?.[1] || "";
            themes.push({
                name: nameTheme,
                root: parseCSSVariables(rootBlock),
                dark: parseCSSVariables(darkBlock),
            });
        });
        return themes;
    } catch (error) {
        console.error(error);
        throw new Error("Error getting themes list");
    }
};
