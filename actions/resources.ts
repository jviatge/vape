"use server";

import { Resource, RessourceParamsWithRoute } from "@/types/resources.type";
import fs from "fs";
import path, { basename } from "path";

export const rscGetOne = async (resources: string): Promise<Resource | undefined> => {
    try {
        return await import("~/resources/" + resources).then((module) => module.default);
    } catch {
        return undefined;
    }
};

export const rscGetAllParams = async (): Promise<RessourceParamsWithRoute[]> => {
    //const baseDir = path.resolve(__dirname, '../');
    const baseDir = basename("../");

    //console.log(baseDir,basename('../'));

    try {
        const files = fs.readdirSync(path.join(baseDir, "resources"));
        const params = await Promise.all(
            files.map(async (file): Promise<RessourceParamsWithRoute> => {
                const paramsRsc: Resource["params"] = await import(
                    "~/resources/" + file.split(".")[0]
                ).then((module) => module.default.params);
                return {
                    ...paramsRsc,
                    ...{ route: file.split(".")[0] },
                };
            })
        );
        return params.sort((a, b) => a.order - b.order);
    } catch {
        return [];
    }
};

export const getModel = async (model: string): Promise<undefined | any> => {
    try {
        return await import("~/models/" + model + ".model").then((module) => module.default);
    } catch {
        return undefined;
    }
};

export const queryGetByModule = async (
    model: string | undefined,
    get: string | undefined,
    id?: string | undefined
) => {
    let data: Record<string, any> = [];

    if (get && model) {
        const classModel = await getModel(model);
        return await classModel[get](id);
    }

    return data;
};
