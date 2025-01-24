import { LayoutRsc } from "@vape/components/partials/LayoutRsc";

export default async function RscLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutRsc
            params={{
                order: 0,
                icon: "book-open",
                label: "Documentation",
            }}
            isDocumentation={true}
        >
            {children}
        </LayoutRsc>
    );
}
