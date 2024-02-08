"use server";

import { authAndPermModelAction } from "@vape/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getModel } from "./resources";

export const queryGetByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        get: z.string(),
    }),
    async ({ model, get }, { userId, role }) => {
        let data: Record<string, any> = [];

        if (get && model) {
            const classModel = await getModel(model);
            return await classModel[get]();
        }
        return data;
    }
);

export const queryGetByModuleAndId = authAndPermModelAction(
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

export const queryPutByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        put: z.string(),
        data: z.record(z.unknown()),
        id: z.string(),
    }),
    async ({ model, put, data, id }) => {
        let res: Record<string, any> = {};

        if (put && model) {
            const classModel = await getModel(model);
            revalidatePath("/" + model);
            revalidatePath("/" + model + "/" + id);
            return await classModel[put](id, data);
        }
        return res;
    }
);

export const queryPostByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        post: z.string(),
        data: z.record(z.unknown()),
    }),
    async ({ model, post, data }) => {
        let res: Record<string, any> = {};

        if (post && model) {
            const classModel = await getModel(model);
            revalidatePath("/" + model);
            return await classModel[post](data);
        }

        return res;
    }
);

export const queryDeleteByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        remove: z.string(),
        id: z.string(),
    }),
    async ({ model, remove, id }) => {
        let res: Record<string, any> = {};

        if (remove && model) {
            const classModel = await getModel(model);
            revalidatePath("/" + model);
            return await classModel[remove](id);
        }
        return res;
    }
);
