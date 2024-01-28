import { rscGetOne } from "@vape/actions/resources";
import { LayoutRsc } from "@vape/components/partials/LayoutRsc";
import { notFound } from "next/navigation";

export default async function RscLayout({
    children,
    params: { resources },
}: {
    children: React.ReactNode;
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    return <LayoutRsc params={rscData.params}>{children}</LayoutRsc>;
}
