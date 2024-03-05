import fs from "fs";
import path, { basename } from "path";

const baseDir = basename("../");

export async function ls(section: string): Promise<string[]> {
    const exclude = [".DS_Store"];
    const files = await fs.readdirSync(path.join(baseDir, section));
    return files.filter((file) => !exclude.includes(file));
}
