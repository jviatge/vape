import { Prisma, PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { formatSQLin } from "./lib/tools";

config({ path: "../.env" });

const db = new PrismaClient().$extends({
    model: {
        $allModels: {
            async delete({ where }: { where: { id: string } }) {
                console.log("delete", where);
                const context = Prisma.getExtensionContext(this);

                const data: Record<string, any> = await db.$queryRawUnsafe(
                    `SELECT * FROM ${context.$name} WHERE id = "${where.id}"`
                );
                console.log("datas", data);

                if (data) {
                    if (data.deleted) {
                        return await db.$queryRawUnsafe(
                            `DELETE FROM ${context.$name} WHERE id = "${where.id}"`
                        );
                    }

                    return await (context as any).update({
                        where: {
                            id: where.id,
                        },
                        data: {
                            deleted: true,
                        },
                    });
                }
            },
            async deleteMany({ where }: { where: { id: { in: string[] } } }) {
                console.log("deleteMany", where);
                const context = Prisma.getExtensionContext(this);

                const datas = await db.$queryRawUnsafe(
                    `SELECT * FROM ${context.$name} WHERE id IN (${formatSQLin(where.id.in)})`
                );
                console.log("datas", datas);

                if (datas && Array.isArray(datas) && datas.length > 0) {
                    const idsTrashHard: string[] = [];
                    const idsTrashSoft: string[] = [];

                    datas.map(async (data: any) => {
                        if (data.deleted) {
                            idsTrashHard.push(data.id);
                        } else {
                            idsTrashSoft.push(data.id);
                        }
                    });

                    if (idsTrashHard.length > 0) {
                        return await db.$queryRawUnsafe(
                            `DELETE FROM ${context.$name} WHERE id IN (${formatSQLin(
                                idsTrashHard
                            )})`
                        );
                    }

                    if (idsTrashSoft.length > 0) {
                        return await (context as any).updateMany({
                            where: {
                                id: {
                                    in: idsTrashSoft,
                                },
                            },
                            data: {
                                deleted: true,
                            },
                        });
                    }
                }
            },
        },
    },
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                if (
                    operation === "findFirst" ||
                    operation === "findFirstOrThrow" ||
                    operation === "findUniqueOrThrow" ||
                    operation === "findMany" ||
                    operation === "count"
                ) {
                    if (args.where?.deleted) {
                        return query(args);
                    }
                    args.where = {
                        deleted: false,
                        ...args.where,
                    };
                }
                return query(args);
            },
        },
    },
});

export const cleanupDatabase = async () => {
    const propertyNames = Object.getOwnPropertyNames(db);
    const modelNames = propertyNames.filter(
        (propertyName) => !propertyName.startsWith("_") && !propertyName.startsWith("$")
    );

    console.log("Cleaning up database...", modelNames);

    try {
        await DeleteMany(modelNames);
    } catch (e) {
        try {
            console.log("Retry cleaning up database...");
            await DeleteMany(modelNames);
        } catch (e) {
            console.error("Error cleaning up database:", e);
            return false;
        }
    }

    console.log("Database cleaned up.");
    return true;
};

const DeleteMany = async (modelNames: string[]) => {
    // @ts-ignore
    await Promise.all(
        modelNames.map(async (model) => await db.$executeRawUnsafe(`DELETE FROM ${model}`))
    );
};

export default db;
