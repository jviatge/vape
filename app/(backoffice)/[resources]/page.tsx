import { rscGetAllParams, rscGetOne } from "@/actions/resources";
import { getVapeConfig } from "@vape/actions/config";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { checkAccessRoute } from "@vape/lib/permissions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { resources: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const config = await getVapeConfig();
    const rscData = await rscGetOne(params.resources);
    return {
        title: `${rscData?.params.label} | ${config.title}`,
    };
}

export async function generateStaticParams() {
    const rscAllParams = await rscGetAllParams();
    const resources: string[] = [];

    rscAllParams.map((rsc) => resources.push(rsc.route));

    return resources.map((resource) => ({ resources: resource }));
}

export default async function PageRsc({ params: { resources } }: Props) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    const session = await checkAccessRoute(rscData, ["read"]);

    if (!session?.user) return notFound();

    return <ResolveModules rscData={rscData} page="index" session={session} />;
}
