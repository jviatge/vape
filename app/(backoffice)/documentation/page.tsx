import { getInitDoc } from "@vape/actions/docMdx";
import { ConfigMdx } from "@vape/components/ConfigMdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function PageDocs() {
    const doc = await getInitDoc();
    if (!doc) return notFound();
    return <MDXRemote source={doc} components={ConfigMdx} />;
}
