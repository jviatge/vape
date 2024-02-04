"use server";

import { action } from "@vape/lib/safe-action";
import { z } from "zod";
import { getModel } from "./resources";

export const queryGetByModule = action(
    z.object({
        model: z.string(),
        get: z.string(),
    }),
    async ({ model, get }) => {
        let data: Record<string, any> = [];

        if (get && model) {
            const classModel = await getModel(model);
            return await classModel[get]();
        }

        return data;
    }
);

export const queryGetByModuleAndId = action(
    z.object({
        model: z.string(),
        get: z.string(),
        id: z.string(),
    }),
    async ({ model, get, id }) => {
        let data: Record<string, any> = [];

        if (get && model) {
            const classModel = await getModel(model);
            return await classModel[get](id);
        }
        return data;
    }
);

export const queryPutByModule = action(
    z.object({
        model: z.string(),
        post: z.string(),
        data: z.record(z.unknown()),
        id: z.string(),
    }),
    async ({ model, post, data, id }) => {
        let res: Record<string, any> = {};

        if (post && model) {
            const classModel = await getModel(model);
            return await classModel[post](id, data);
        }
        return res;
    }
);

export const queryPostByModule = action(
    z.object({
        model: z.string(),
        post: z.string(),
        data: z.record(z.unknown()),
    }),
    async ({ model, post, data }) => {
        let res: Record<string, any> = {};

        if (post && model) {
            const classModel = await getModel(model);
            return await classModel[post](data);
        }
        return res;
    }
);

export const queryDeleteByModule = action(
    z.object({
        model: z.string(),
        del: z.string(),
        id: z.string(),
    }),
    async ({ model, del, id }) => {
        let res: Record<string, any> = {};

        if (del && model) {
            const classModel = await getModel(model);
            return await classModel[del](id);
        }

        return res;
    }
);
