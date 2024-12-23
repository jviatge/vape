import { hash } from "@database/lib/bcrypt";
import { paginateAndFilter } from "@vape/lib/filterModel";
import { FilterModel } from "@vape/types/model.type";
import db from "database/db";

function exclude(data: Record<string, any> | null, keys: string[]) {
    return data
        ? Object.fromEntries(Object.entries(data).filter(([key]) => !keys.includes(key)))
        : data;
}

export default class users {
    public static findMany = async (filterModel: FilterModel) => {
        return await paginateAndFilter(
            filterModel,
            async (filter) => await db.users.count({ ...filter }),
            async (limit, startIndex, filter) =>
                await db.users.findMany({
                    ...filter,
                    take: limit,
                    skip: startIndex,
                })
        );
    };

    public static findOne = async (id: string) => {
        const user = await db.users.findUnique({
            where: {
                id: id,
            },
        });
        return exclude(user, ["password"]);
    };

    public static createOne = async (data: any) => {
        const checkUserEmailExist = await db.users.findUnique({
            where: { email: data.email },
        });

        if (checkUserEmailExist)
            throw {
                status: 400,
                message: `User with the email '${data.email}' already exists`,
            };
        const passwordHash = await hash(data.password);
        return await db.users.create({
            data: {
                password: passwordHash,
                last_name: data.last_name,
                first_name: data.first_name,
                phone: data.phone,
                email: data.email,
                active: data.active,
                role: data.role,
            },
        });
    };

    public static updateOne = async (id: string, data: any) => {
        let passwordHash = null;
        if (data.password) passwordHash = await hash(data.password);
        return await db.users.update({
            where: {
                id: id,
            },
            data: {
                ...(passwordHash ? { password: passwordHash } : {}),
                last_name: data.last_name,
                first_name: data.first_name,
                phone: data.phone,
                email: data.email,
                active: data.active,
                role: data.role,
            },
        });
    };

    public static deleteMany = async (ids: string[]) => {
        await db.users.updateMany({
            where: {
                id: {
                    in: ids,
                },
            },
            data: {
                active: false,
            },
        });

        return await db.users.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    };

    public static trash = async (filterModel: any) => {
        return await db.users.findMany({
            ...filterModel,
        });
    };

    public static findByID = async (uniqueField: string, id: string) => {
        return await db.users.findFirst({
            where: {
                [uniqueField]: id,
            },
        });
    };
}
