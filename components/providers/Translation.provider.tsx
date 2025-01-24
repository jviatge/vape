"use client";

import { useTranslation } from "@vape/hooks/useTranslation";
import { Loading } from "@vape/tools";

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
    const { getTranslation } = useTranslation();

    return getTranslation.isLoading || getTranslation.isFetching ? (
        <div className="h-screen w-screen flex justify-center items-center">
            <Loading />
        </div>
    ) : (
        children
    );
};
