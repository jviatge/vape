import { VapeConfig } from "@vape/types/vapeConfg.type";

export const getConfg = async (): Promise<VapeConfig> => {
    try {
        return await import("~/vape.config").then((module) => module.default);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting config");
    }
};
