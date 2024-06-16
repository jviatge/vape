import { StaticImageData } from "next/image";

export type VapeConfig = {
    version: string;
    logo?: StaticImageData;
    auth: {
        model: string;
        get: string;
        uniqueField: string;
    };
    roles: {
        label: string;
        value: string;
        color?: string;
    }[];
};
