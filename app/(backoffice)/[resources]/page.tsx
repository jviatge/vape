import { rscGetAllParams, rscGetOne } from "@/actions/resources";
import TableModule from "@vape/components/fields/modules/Table.module";

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

    const model = await import("~/models/" + rscData.params.model + ".model").then(
        (module) => module.default
    );
    const data = await model.findMany();

    return <TableModule table={rscData.table} data={data} />;
}
