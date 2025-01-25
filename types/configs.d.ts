export type VapeConfig = {
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
    translations: {
        default: string;
        available?: string[];
    };
};
