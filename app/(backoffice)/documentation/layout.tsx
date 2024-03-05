import { getRouteDocs } from "@vape/actions/docMdx";
import { LayoutRsc } from "@vape/components/partials/LayoutRsc";
import Link from "next/link";

export default async function RscLayout({
    children,
}: {
    children: React.ReactNode;
    params: { resources: string };
}) {
    const sections = await getRouteDocs();

    const baseLink = "http://localhost:3000/documentation";

    return (
        <LayoutRsc
            params={{
                order: 0,
                icon: "book-open",
                label: "Documentation",
            }}
            disabledCreate={true}
        >
            <div>
                <div>
                    {sections.map((section, i) => (
                        <Link key={i} href={section}>
                            {section}
                        </Link>
                    ))}
                </div>
                {children}
            </div>
        </LayoutRsc>
    );
}
