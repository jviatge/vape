import { rscGetAllParams } from "@/actions/resources";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Resource } from "@/types/resources.type";
import { ContainerRsc } from "@vape/components/partials/ContainerRsc";
import { Card } from "@vape/components/ui/card";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const rscAllParams = await rscGetAllParams();
    const resources: string[] = [];

    rscAllParams.map((rsc) => resources.push(rsc.route));

    return resources.map((resource) => ({ resources: resource }));
}

async function getRsc(resources: string): Promise<Resource> {
    try {
        return await import("~/resources/" + resources).then((module) => module.default);
    } catch (error) {
        console.log(error);
        return notFound();
    }
}

export default async function PageRsc({
    params: { resources },
}: {
    params: { resources: string };
}) {
    const rscData = await getRsc(resources);

    const model = await import("~/models/" + rscData.params.model + ".model").then(
        (module) => module.default
    );
    const data = await model.findMany();

    return (
        <ContainerRsc params={rscData.params}>
            <Card className="overflow-hidden">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader className="bg-card">
                        <TableRow>
                            {rscData.table.map((column) => (
                                <TableHead key={column.name} className="px-2">
                                    {column.label ?? column.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-primary-foreground">
                        {data.map((row: Record<string, string | number>, index: number) => (
                            <TableRow key={index}>
                                {rscData.table.map((column, index) => (
                                    <TableCell key={column.name + index} className="p-2">
                                        {column.type === "date"
                                            ? new Date(row[column.name]).toLocaleDateString("fr", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "2-digit",
                                              })
                                            : column.type === "hour"
                                            ? new Date(row[column.name]).toLocaleTimeString("fr", {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : String(row[column.name])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </ContainerRsc>
    );
}
