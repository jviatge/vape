import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/ResolveModules";
import { dataByPage } from "@vape/lib/resolver";
import { notFound } from "next/navigation";

export default async function PageOneRsc({
    params: { resources, id },
}: {
    params: { resources: string; id: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    const data = await dataByPage(rscData, "_id", Number(id));

    return <ResolveModules rscData={rscData} data={data} page="_id" />;
}
