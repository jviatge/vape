import { getVapeConfig } from "@vape/actions/config";
import { rscGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/core/server/ResolveModules";
import { checkAccessRoute } from "@vape/lib/permissions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        resources: string;
        id: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { resources } = await params;
    const config = await getVapeConfig();
    const rscData = await rscGetOne(resources);
    return {
        title: `Édition - ${rscData?.params.label} | ${config.title}`,
    };
}

export default async function PageOneRsc({ params }: Props) {
    const { resources, id } = await params;
    const rscData = await rscGetOne(resources);

    if (!rscData || !rscData._id) return notFound();

    const session = await checkAccessRoute(rscData, ["read", "update"]);

    if (!session?.user) return notFound();

    return <ResolveModules rscData={rscData} page="_id" id={id} session={session} />;
}
