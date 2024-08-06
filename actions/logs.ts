"use server";

import fs from "fs";

export const getListFileLogs = async (): Promise<string[] | undefined> => {
    try {
        const listFile = fs.readdirSync("./logs/");
        return listFile;
    } catch {
        return undefined;
    }
};

export const dowmloadFileLogs = async (fileName: string): Promise<string | undefined> => {
    try {
        const file = fs.readFileSync("./logs/" + fileName, "utf-8");
        return file;
    } catch {
        return undefined;
    }
};
