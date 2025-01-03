import { getOneDoc } from "@vape/actions/docMdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//     const rscAllParams = await rscGetAllParams();
//     const resources: string[] = [];

//     rscAllParams.map((rsc) => resources.push(rsc.route));

//     return resources.map((resource) => ({ resources: resource }));
// }

type Props = {
    params: Promise<{
        sections: string[];
    }>;
};

export default async function PageDoc({ params }: Props) {
    const { sections } = await params;

    const doc = await getOneDoc(sections);

    if (!doc) return notFound();

    return <MDXRemote source={doc} />;
}
