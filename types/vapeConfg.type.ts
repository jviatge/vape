export type VapeConfig = {
    version: string;
    title: string;
    logo?: string;
    bgLogin?: string;
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
