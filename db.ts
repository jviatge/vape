import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const cleanupDatabase = async () => {
    const propertyNames = Object.getOwnPropertyNames(db);
    const modelNames = propertyNames.filter(
        (propertyName) => !propertyName.startsWith("_") && !propertyName.startsWith("$")
    );

    console.log("Cleaning up database...", modelNames);
    // @ts-ignore
    await Promise.all(modelNames.map(async (model) => await db[model].deleteMany()));

    console.log("Database cleaned up.");
    return true;
};

export default db;
