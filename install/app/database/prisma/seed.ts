import { cleanupDatabase } from "../db";
import { usersFactory } from "../factories/users.factory";

export async function seed() {
    await cleanupDatabase();
    await usersFactory();
}

seed();
