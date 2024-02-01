import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { notFound } from "next/navigation";

export default async function PageNewRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    return <ResolveModules rscData={rscData} page="create" />;
}
