"use client";

import { useQuery } from "@tanstack/react-query";
import { getListTranslations, getTranslation, Translation } from "@vape/actions/translation";
import { queryClient } from "@vape/lib/queryClient";
import useLocalStorage from "./useLocalStorage";

export const useTranslation = () => {
    const [local, setLocal] = useLocalStorage<string>("locale", "fr");

    const queryAvailableTranslations = useQuery<any, Translation[]>({
        queryKey: ["translations-app"],
        queryFn: () => getListTranslations(),
        select: (data: string[]) =>
            data.map((locale) => ({
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
                let trans:string|Record<any, any>= "";
                keys.forEach((k) => {
                    if (typeof trans === "object") {
                        trans = trans[k];
                    } else {
                        trans = value[k];
                    }
                });
                return trans || key;
            }
            return queryGetTranslation.data[key] || key;
        }
        return key;
    };
    return {
        switchTranslation,
        availableTranslations: queryAvailableTranslations,
        getTranslation: queryGetTranslation,
        local,
        T,
    };
};
