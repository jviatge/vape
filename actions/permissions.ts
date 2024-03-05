"use server";

import { getVapeConfig } from "./config";

export const resolveLabelRole = async (value?: string): Promise<string> => {
    const config = await getVapeConfig();

    const label = config.roles.find(
        (role: { value: string; label: string }) => role.value === value
    )?.label;
    return label ?? value ?? "";
};
