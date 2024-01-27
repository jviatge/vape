import { rscGetOne } from "@vape/actions/resources";
import { LayoutRsc } from "@vape/components/partials/LayoutRsc";

export default async function RscLayout({
    children,
    params: { resources },
}: {
    children: React.ReactNode;
    params: { resources: string };
}) {
    const rscData = await rscGetOne(resources);
    return <LayoutRsc params={rscData.params}>{children}</LayoutRsc>;
}
