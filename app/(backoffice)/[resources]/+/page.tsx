import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { checkAccessRoute } from "@vape/lib/permissions";
import { notFound } from "next/navigation";

export default async function PageNewRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    const session = await checkAccessRoute(rscData, ["read", "create"]);

    return <ResolveModules rscData={rscData} page="create" />;
}
