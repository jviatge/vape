import { rscGetAllParams, rscGetOne } from "@/actions/resources";
import { ResolveModules } from "@vape/components/core/ResolveModules";
import { dataByPage } from "@vape/lib/resolver";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const rscAllParams = await rscGetAllParams();
    const resources: string[] = [];

    rscAllParams.map((rsc) => resources.push(rsc.route));

    return resources.map((resource) => ({ resources: resource }));
}

export default async function PageRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    const data = await dataByPage(rscData, "index");

    return <ResolveModules rscData={rscData} data={data} page="index" />;
}
