import { ModeToggle } from "@/components/ModeToggle";
import { SideBar } from "@/components/partials/SideBar";
import { getLogo } from "@vape/actions/config";
import { resolveLabelRole } from "@vape/actions/permissions";
import { rscGetAllParams } from "@vape/actions/resources";
import { CardUser } from "@vape/components/CardUser";
import { authOptions } from "@vape/lib/auth";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayoutBo({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const links: {
        href: string;
        label: string;
        icon: keyof typeof dynamicIconImports;
        separator?: boolean;
    }[] = [];

    const rscAllParams = await rscGetAllParams();

    rscAllParams.map((rsc) => {
        if (rsc.permissons?.read) {
            const rolePermited = rsc.permissons.read.find((role) => role === user?.role);
            if (rolePermited) {
                links.push({
                    href: "/" + rsc.route,
                    label: rsc.label,
                    icon: rsc.icon,
                    separator: rsc.separator ?? false,
                });
            }
        } else {
            links.push({
                href: "/" + rsc.route,
                label: rsc.label,
                icon: rsc.icon,
                separator: rsc.separator ?? false,
            });
        }
    });

    const labelRole = await resolveLabelRole(user?.role);

    const logo = await getLogo();

    return (
        <div className="h-screen flex bg-background relative">
            <SideBar links={links} logo={logo} />
            <div className="w-full relative">
                <header className="w-full h-14 border-b border-0 bg-primary-foreground">
                    <div className="flex justify-between items-center h-full px-5">
                        <CardUser
                            name={`${user?.first_name} ${user?.last_name}`}
                            role={labelRole}
                        />
                        <div className="flex items-center space-x-3">
                            <ModeToggle />
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
