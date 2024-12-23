import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import db from "../db";
import { hash } from "../lib/bcrypt";

const user = async (role: string, email: string): Promise<Prisma.UsersCreateManyInput> => ({
    last_name: faker.person.lastName(),
    first_name: faker.person.firstName(),
    password: await hash("password"),
    email: email,
    phone: faker.phone.number(),
    role: role,
    active: true,
});

export const usersFactory = async (): Promise<string[]> => {
    const usersIDs: string[] = [];
    const password = await hash("password");
    const users = [
        {
            last_name: "Viatgé",
            first_name: "Julien",
            password,
            email: "julien.viatge@gmail.com",
            role: "super_admin",
        },
        await user("admin", "admin@test.com"),
        await user("agent_boat", "agent_boat@test.com"),
        await user("agent_home", "agent_home@test.com"),
    ];

    for (const user of users) {
        const userDB = await db.users.create({ data: user });
        usersIDs.push(userDB.id);
    }
    return usersIDs;
};
