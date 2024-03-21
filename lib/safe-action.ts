import { rscGetOne } from "@vape/actions/resources";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { authOptions } from "./auth";

export const action = createSafeActionClient();

export const authAndPermModelAction = createSafeActionClient({
    async middleware(parsedInput: any) {
        const session = await getServerSession(authOptions);
        if (!session || !session?.user) {
            throw new Error("Unauthorized");
        }
        const user = session.user;

        if (parsedInput.model) {
            const resource = await rscGetOne(parsedInput.model);
            if (!resource) {
                throw new Error("Resource not found");
            }
            const endData = {
                userId: user.id,
                role: user.role,
            };

            const permissons = resource?.params.permissons;

            if (!permissons) {
                return endData;
            }

            if (parsedInput.get && permissons?.read) {
                if (permissons.read.includes(user.role)) {
                    return endData;
                } else {
                    throw new Error("Unauthorized");
                }
            }

            if (parsedInput.post && permissons?.create) {
                if (permissons.create.includes(user.role)) {
                    return endData;
                } else {
                    throw new Error("Unauthorized");
                }
            }

            if (parsedInput.put && permissons?.update) {
                if (permissons.update.includes(user.role)) {
                    return endData;
                } else {
                    throw new Error("Unauthorized");
                }
            }

            /* if (parsedInput.remove && permissons?.delete) {
                if (permissons.delete.includes(user.role)) {
                    return endData;
                } else {
                    throw new Error("Unauthorized");
                }
            } */

            return endData;
        } else {
            throw new Error("Model not found");
        }
    },
});

export const authenicatedAction = createSafeActionClient({
    async middleware() {
        const session = await getServerSession(authOptions);
        if (!session || !session?.user) {
            throw new Error("Unauthorized");
        }
        const user = session.user;

        return {
            userId: user.id,
            role: user.role,
        };
    },
});

type UserAction = { userId: string; role: string };

export const permissionAction = async (role: string, action: () => any) => {
    return action();
};

export const devAction = createSafeActionClient({
    async middleware() {
        const session = await getServerSession(authOptions);
        if (process.env.MODE === "development") {
            if (!session || !session?.user) {
                throw new Error("Unauthorized");
            }
            const user = session.user;

            return {
                userId: user.id,
                role: user.role,
            };
        }
        throw new Error("Unauthorized");
    },
});
