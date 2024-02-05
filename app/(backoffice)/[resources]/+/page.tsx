import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { checkAccess } from "@vape/lib/permissionRoute";
import { notFound } from "next/navigation";

export default async function PageNewRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    const session = await checkAccess(rscData, ["read", "create"]);

    return <ResolveModules rscData={rscData} page="create" />;
}
