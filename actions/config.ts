"use server";

import logo from "@/assets/logo.svg";
import { VapeConfig } from "@vape/types/vapeConfg.type";
import { StaticImageData } from "next/image";

export const getVapeConfig = async (): Promise<VapeConfig> => {
    try {
        return await import("~/vape.config").then((module) => module.default);
    } catch (error) {
        console.error(error);
        throw new Error("Error getting config");
    }
};

export const getLogo = async (): Promise<StaticImageData> => {
    try {
        const config = await getVapeConfig();

        if (config.logo) {
            return config.logo;
        } else {
            return logo;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error getting logo");
    }
};

export const getBgLogin = async (): Promise<StaticImageData> => {
    try {
        const config = await getVapeConfig();

        if (config.bgLogin) {
            return config.bgLogin;
        } else {
            return logo;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error getting bgLogin");
    }
};
