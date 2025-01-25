import { getListThemes, getVapeConfig } from "@vape/actions/config";
import { resolveLabelRole } from "@vape/actions/permissions";
import { rscGetAllParams } from "@vape/actions/resources";
import { CommandBar } from "@vape/components/partials/header/CommandBar";
import { LocalSelect } from "@vape/components/partials/header/LocalSelect";
import { ModeToggle } from "@vape/components/partials/header/ModeToggle";
import { SideBar } from "@vape/components/partials/sideBar/SideBar";
import { authOptions } from "@vape/lib/auth";
import versions from "@vape/lib/versions";
import { TypeLink } from "@vape/types/general";
import { RessourceParamsWithRoute } from "@vape/types/resources";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayoutBo({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const links: TypeLink[] = [];

    const rscAllParams: RessourceParamsWithRoute[] = await rscGetAllParams();

    links.push({
        href: "/dashboard",
        label: "Dashboard",
        icon: "home",
        separator: false,
        disabledCreate: true,
        disabledEdit: true,
    });

    rscAllParams.map((rsc, i) => {
        let separator = rsc.separator ?? false;
        if (i === 0) separator = true;
        if (rsc.permissons?.read) {
            const rolePermited = rsc.permissons.read.find((role) => role === user?.role);
            if (rolePermited) {
                links.push({
                    href: "/" + rsc.route,
                    label: rsc.label,
                    icon: rsc.icon,
                    separator: separator,
                    disabledCreate: rsc.disabledCreate ?? false,
                    disabledEdit: rsc.disabledEdit ?? false,
                });
            }
        }
        /*  else {
            links.push({
                href: "/" + rsc.route,
                label: rsc.label,
                icon: rsc.icon,
                separator: separator,
                disabledCreate: rsc.disabledCreate ?? false,
                disabledEdit: rsc.disabledEdit ?? false,
            });
        } */
    });

    links.push({
        href: "/documentation",
        label: "Documentation",
        icon: "book",
        separator: true,
        disabledCreate: true,
        disabledEdit: true,
    });

    const labelRole = await resolveLabelRole(user?.role);

    const config = await getVapeConfig();

    const listThemes = await getListThemes();

    const isDevMode = process.env.MODE_APP === "development";

    return (
        <div className="h-screen flex relative w-screen overflow-hidden">
            <SideBar
                listThemes={listThemes}
                links={links}
                firstName={user?.first_name}
                lastName={user?.last_name}
                role={labelRole}
                versionApp={versions.app}
                versionVape={versions.vape}
            />
            <div className="w-full relative h-full">
                <header className="w-full h-14 border-b border-0 bg-background md:pr-0 pr-[58px]">
                    <div className="flex justify-between items-center h-full px-3">
                        <CommandBar links={links} />
                        {isDevMode ? (
                            <span className="text-orange-700 text-xs font-semibold italic">
                                DEV App: V{versions.app} - Vape: V{versions.vape}
                            </span>
                        ) : null}
                        <div className="flex items-center space-x-3">
                            <ModeToggle />
                            <LocalSelect />
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
