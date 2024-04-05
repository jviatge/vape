"use server";

import { logInfo } from "@vape/lib/logs";
import { getVapeConfig } from "./config";

export const resolveLabelRole = async (value?: string): Promise<string> => {
    logInfo(`[resolveLabelRole] | ${value}`);
    const config = await getVapeConfig();

    const label = config.roles.find(
        (role: { value: string; label: string }) => role.value === value
    )?.label;
    return label ?? value ?? "";
};
