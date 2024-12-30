"use client";

import { useQuery } from "@tanstack/react-query";
import { getListTranslations, getTranslation, Translation } from "@vape/actions/translation";
import { queryClient } from "@vape/lib/queryClient";
import useLocalStorage from "./useLocalStorage";

export const useTranslation = () => {
    const [local, setLocal] = useLocalStorage<string>("locale", "fr");

    const ResolveFlag = (local: string) => {
        let flag = local.toUpperCase();
        if (local === "en") flag = "GB";
        return flag;
    };

    const currentTranslation = (): string => {
        return ResolveFlag(local);
    };

    const queryAvailableTranslations = useQuery<any, Translation[]>({
        queryKey: ["translations-app"],
        queryFn: () => getListTranslations(),
        select: (data: string[]) =>
            data.map((locale) => ({
                flag: ResolveFlag(locale),
                locale,
            })),
    });

    const queryGetTranslation = useQuery<Record<string, any>>({
        queryKey: ["get-translations-app", local],
        queryFn: () => getTranslation(local),
    });

    const switchTranslation = (lang: string) => {
        setLocal(lang);
        queryClient.invalidateQueries({ queryKey: ["get-translations-app"] });
    };

    const T = (key: string): string => {
        if (queryGetTranslation.data) {
            if (key.includes(".")) {
                const keys = key.split(".");
                let value = queryGetTranslation.data;
                keys.forEach((k) => {
                    value = value[k];
                });
                return value || key;
            }
            return queryGetTranslation.data[key] || key;
        }
        return key;
    };
    return {
        switchTranslation,
        currentTranslation,
        availableTranslations: queryAvailableTranslations,
        getTranslation: queryGetTranslation,
        T,
    };
};
