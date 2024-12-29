"use server";

export const getListLocals = async () => {
    return ["FR", "US"];
};

export const getCurrentLocal = async () => {
    return "FR";
};
