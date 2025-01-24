"use server";

import { ls } from "@vape/lib/fs";
import { logRsc } from "@vape/lib/logs";

export type Translation = {
    flag: string;
    locale: string;
};

export const getListTranslations = async (): Promise<string[]> => {
    logRsc(`[localeGetListTranslations]`);
    try {
        const files = await ls("langs");

        const locales = await Promise.all(
            files.map(async (file) => {
                const locale = file.split(".")[0];
                return locale;
            })
        );
        return locales;
    } catch {
        return [];
    }
};

export const getTranslation = async (locale: string): Promise<Record<string, any>> => {
    logRsc(`[localeGetTranslation]: ~/langs/${locale}.json`);
    try {
        const translation = await import(`~/langs/${locale}.json`);
        return JSON.parse(JSON.stringify(translation));
    } catch {
        console.error("Error while loading translation");
        return {};
    }
};
