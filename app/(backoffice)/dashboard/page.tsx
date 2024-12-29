import { getVapeConfig } from "@vape/actions/config";
import { modulesGetOne } from "@vape/actions/resources";
import { ResolveModules } from "@vape/components/ResolveModules";
import { authOptions } from "@vape/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const config = await getVapeConfig();
    return {
        title: `Dashborad | ${config.title}`,
    };
}

export default async function PageDashboard() {
    const moduleData = await modulesGetOne();
    if (!moduleData) return notFound();
    const session = await getServerSession(authOptions);
    if (!session?.user) return notFound();
    return (
        <ResolveModules
            rscData={{
                id: "dashboard",
                params: {
                    label: "Dashboard",
                    icon: "home",
                    order: -1,
                },
                index: {
                    modules: moduleData,
                },
            }}
            page="index"
            session={session}
        />
    );
}
