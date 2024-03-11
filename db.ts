import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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
    await Promise.all(modelNames.map(async (model) => await db[model].deleteMany()));
};

export default db;
