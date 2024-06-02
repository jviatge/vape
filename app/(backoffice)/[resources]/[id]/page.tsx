import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { checkAccessRoute } from "@vape/lib/permissions";
import { notFound } from "next/navigation";

export default async function PageOneRsc({
    params: { resources, id },
}: {
    params: { resources: string; id: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData || !rscData._id) return notFound();

    const session = await checkAccessRoute(rscData, ["read", "update"]);

    if (!session?.user) return notFound();

    return <ResolveModules rscData={rscData} page="_id" id={id} session={session} />;
}
