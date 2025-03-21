import { LayoutRsc } from "@vape/components/partials/LayoutRsc";

export default async function RscLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutRsc
            isDashboard={true}
            params={{
                order: 0,
                icon: "home",
                label: "Dashboard",
            }}
        >
            {children}
        </LayoutRsc>
    );
}
