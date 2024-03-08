import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const cleanupDatabase = async () => {
    const propertyNames = Object.getOwnPropertyNames(db);
    const modelNames = propertyNames.filter(
        (propertyName) => !propertyName.startsWith("_") && !propertyName.startsWith("$")
    );
    // @ts-ignore
    return await Promise.all(modelNames.map((model) => db[model].deleteMany()));
};

export default db;
