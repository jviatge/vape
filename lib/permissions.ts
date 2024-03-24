import { Resource } from "@vape/types/resources.type";
import { Session, getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "./auth";

export type Permissions = {
    read: boolean;
    create: boolean;
    update: boolean;
};

export const checkAccessRoute = async (
    rscData: Resource,
    actions: Array<"read" | "create" | "update" | "delete">
): Promise<Session | void> => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) redirect("/login");

    const permitions = rscData.params?.permissons;

    if (permitions) {
        actions.map((action: "read" | "create" | "update" | "delete") => {
            if (permitions[action] && Array.isArray(permitions[action])) {
                // @ts-ignore
                const permition = permitions[action].find((role) => role === user.role);
                if (!permition) notFound();
            }
        });
    }

    return session;
};

export const getPermissions = async (rscData: Resource): Promise<Permissions> => {
    const actions: Array<"read" | "create" | "update" | "delete"> = [
        "read",
        "create",
        "update",
        "delete",
    ];
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) redirect("/login");
    const permitions = rscData.params?.permissons;

    let permitionsReturn = {
        read: true,
        create: true,
        update: true,
        delete: true,
    };

    if (permitions) {
        actions.map((action: "read" | "create" | "update" | "delete") => {
            if (permitions[action] && Array.isArray(permitions[action])) {
                // @ts-ignore
                const permition = permitions[action].find((role) => role === user.role);
                if (!permition) permitionsReturn[action] = false;
            }
        });
    }

    return permitionsReturn;
};
