import { LayoutRsc } from "@vape/components/partials/LayoutRsc";

export default async function RscLayout({
    children,
}: {
    children: React.ReactNode;
    params: { resources: string };
}) {
    return (
        <LayoutRsc
            params={{
                order: 0,
                icon: "book-open",
                label: "Documentation",
            }}
            disabledCreate={true}
        >
            {children}
        </LayoutRsc>
    );
}
