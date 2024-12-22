"use server";

import fs from "fs";

export const getInitDoc = async (): Promise<string | undefined> => {
    try {
        return fs.readFileSync("./README.md", "utf-8");
    } catch {
        return undefined;
    }
};

export const getOneDoc = async (sections: string[]): Promise<string | undefined> => {
    try {
        return fs.readFileSync("./docs/" + sections.join("/") + ".md", "utf-8");
    } catch {
        return undefined;
    }
};

/* export const getRouteDocs = async (): Promise<string[]> => {
    const exclude = [".DS_Store"];
    const files = fs.readdirSync("./docs/");
    return files.filter((file) => !exclude.includes(file));
}; */
