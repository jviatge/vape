"use server";

import { Module, Resource, RessourceParamsWithRoute } from "@/types/resources.type";
import { ls } from "@vape/lib/fs";
import { logRsc } from "@vape/lib/logs";

export const rscGetOne = async (
    resources: string
): Promise<
    | (Resource & {
          id: string;
      })
    | undefined
> => {
    logRsc(`[rscGetOne] | resources:${resources}`);
    try {
        const rsc = await import("~/resources/" + resources).then((module) => module.default);
        return {
            ...rsc,
            id: resources,
        };
    } catch {
        return undefined;
    }
};

export const modulesGetOne = async (): Promise<Module[] | undefined> => {
    logRsc(`[moduleGetOne] | resources:dashboard`);
    try {
        const module = await import("~/resources/index").then((module) => module.default);
        return module;
    } catch {
        return undefined;
    }
};

export const rscGetAllParams = async (): Promise<RessourceParamsWithRoute[]> => {
    logRsc(`[rscGetAllParams]`);
    try {
        const files = await ls("resources");
        const params = await Promise.all(
            files.map(async (file): Promise<RessourceParamsWithRoute | undefined> => {
                if (file === "index.ts") return;
                const paramsRsc: Resource["params"] = await import(
                    "~/resources/" + file.split(".")[0]
                ).then((module) => module.default.params);
                return {
                    ...paramsRsc,
                    ...{ route: file.split(".")[0] },
                };
            })
        );
        const paramsFiltered = params.filter((e) => e !== undefined) as RessourceParamsWithRoute[];
        return paramsFiltered.sort((a, b) => a.order - b.order);
    } catch {
        return [];
    }
};

export const getModel = async (model: string): Promise<undefined | any> => {
    logRsc(`[getModel] | model:${model}`);
    try {
        return await import("~/models/" + model + ".model").then((module) => module.default);
    } catch (error) {
        console.error("Model not found: ", model);
        console.error(error);
        return undefined;
    }
};
