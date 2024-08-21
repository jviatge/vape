"use server";

import { authOptions } from "@vape/lib/auth";
import { logQuery } from "@vape/lib/logs";
import { authAndPermModelAction } from "@vape/lib/safe-action";
import { FilterModel } from "@vape/types/model.type";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { getModel } from "./resources";

export const queryGetByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        query: z.record(z.string(), z.any()),
        searchInputField: z.array(z.string()).optional(),
    }),
    async ({ model, query, searchInputField }, { userId, role }) => {
        logQuery(`[queryGetByModule] | model:${model}`);
        let data: Record<string, any> = [];

        if (model) {
            const classModel = await getModel(model);
            return await classModel[query.get]({
                query,
                searchInputField,
            } as FilterModel);
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
        logQuery(`[queryGetByModuleAndId] | model:${model} | id:${id} | get:${get}`);
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
        const session = await getServerSession(authOptions);
        const user = session?.user;

        logQuery(
            `[queryGetByModuleAndId] | user: ${user?.name} | model: ${model} | id: ${id} | put: ${put}`
        );
        let res: Record<string, any> = {};

        if (put && model) {
            const classModel = await getModel(model);
            /* revalidatePath("/" + model); */
            /* revalidatePath("/" + model + "/" + id); */
            return await classModel[put](id, data, user);
        }
        return res;
    }
);

export const queryPutMulitpleByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        put: z.string(),
        data: z.record(z.unknown()),
        ids: z.array(z.number()),
    }),
    async ({ model, put, data, ids }) => {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        logQuery(
            `[queryGetByModuleAndId] | user: ${user?.name} | model:${model} | ids:${JSON.stringify(
                ids
            )} | put:${put}`
        );
        let res: Record<string, any> = {};

        if (put && model) {
            const classModel = await getModel(model);
            /* revalidatePath("/" + model); */
            return await classModel[put](ids, data, user);
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
        const session = await getServerSession(authOptions);
        const user = session?.user;

        logQuery(`[queryGetByModuleAndId] | user: ${user?.name} | model:${model} | put:${post}`);
        let res: Record<string, any> = {};

        if (post && model) {
            const classModel = await getModel(model);
            /* revalidatePath("/" + model); */
            return await classModel[post](data, user);
        }

        return res;
    }
);

export const queryDeleteByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        remove: z.string(),
        id: z.number(),
    }),
    async ({ model, remove, id }) => {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        logQuery(
            `[queryGetByModuleAndId] | user: ${user?.name} | model:${model} | id:${id} | remove:${remove}`
        );
        let res: Record<string, any> = {};

        if (remove && model) {
            const classModel = await getModel(model);
            /* revalidatePath("/" + model); */
            return await classModel[remove](id, user);
        }
        return res;
    }
);

export const queryDeleteMulitpleByModule = authAndPermModelAction(
    z.object({
        model: z.string(),
        remove: z.string(),
        ids: z.array(z.number()),
    }),
    async ({ model, remove, ids }) => {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        logQuery(
            `[queryGetByModuleAndId] | user: ${user?.name} | model:${model} | ids:${JSON.stringify(
                ids
            )} | remove:${remove}`
        );
        let res: Record<string, any> = {};

        if (remove && model) {
            const classModel = await getModel(model);
            /* revalidatePath("/" + model); */
            return await classModel[remove](ids, user);
        }
        return res;
    }
);
