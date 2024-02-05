"use server";

import { getConfg } from "./config";

export const resolveLabelRole = async (value: string): Promise<string> => {
    const config = await getConfg();

    const label = config.roles.find(
        (role: { value: string; label: string }) => role.value === value
    )?.label;
    return label ?? value;
};
