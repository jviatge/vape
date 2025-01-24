import { rscGetOne } from "@vape/actions/resources";
import { LayoutRsc } from "@vape/components/partials/LayoutRsc";
import { notFound } from "next/navigation";

export default async function RscLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ resources: string }>;
}) {
    const { resources } = await params;
    const rscData = await rscGetOne(resources);

    if (!rscData) return notFound();

    return (
        <LayoutRsc params={rscData.params} idRsc={rscData.id}>
            {children}
        </LayoutRsc>
    );
}
