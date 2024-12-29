import { getVapeConfig } from "@vape/actions/config";
import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/ResolveModules";
import { checkAccessRoute } from "@vape/lib/permissions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { resources: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { resources } = await params;
    const config = await getVapeConfig();
    const rscData = await rscGetOne(resources);
    return {
        title: `Création - ${rscData?.params.label} | ${config.title}`,
    };
}

export default async function PageNewRsc({ params: { resources } }: Props) {
    const rscData = await rscGetOne(resources);

    if (!rscData || rscData?.params.disabledCreate) return notFound();

    const session = await checkAccessRoute(rscData, ["read", "create"]);

    return <ResolveModules rscData={rscData} page="create" session={session} />;
}
