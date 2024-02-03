import { signJwtAccessToken } from "@/lib/jwt";
//import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    // const user = await prisma.users.findFirst({
    //     where: {
    //         email: body.username,
    //     },
    // });

    const user = {
        email: "jose",
        password: "$2b$10$6X4y2c9Kkxu9rN7wzYw4gOw2fK8ZQYmW5v5U3JW6f8v7nN4B8D7aS",
    };

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);

        const result = {
            ...userWithoutPass,
            accessToken,
        };
        return new Response(JSON.stringify(result));
    } else
        return new Response(
            JSON.stringify({
                message: "Unathenticated",
            }),
            {
                status: 401,
            }
        );
}
