import { Resource } from "@vape/types/resources.type";
import { Session, getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "./auth";

export const checkAccess = async (
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
