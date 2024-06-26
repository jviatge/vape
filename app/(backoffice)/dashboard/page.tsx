import { modulesGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { authOptions } from "@vape/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function PageDashboard({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const moduleData = await modulesGetOne();

    if (!moduleData) return notFound();

    const session = await getServerSession(authOptions);

    if (!session?.user) return notFound();

    return (
        <ResolveModules
            rscData={{
                id: "dashboard",
                params: {
                    label: "Dashboard",
                    icon: "home",
                    order: -1,
                },
                index: {
                    modules: moduleData,
                },
            }}
            page="index"
            session={session}
        />
    );
}
