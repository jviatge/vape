import { ModeToggle } from "@/components/ModeToggle";
import { getListThemes, getLogo, getVapeConfig } from "@vape/actions/config";
import { resolveLabelRole } from "@vape/actions/permissions";
import { rscGetAllParams } from "@vape/actions/resources";
import { CommandBar } from "@vape/components/CommandBar";
import { SideBar } from "@vape/components/partials/SideBar";
import { authOptions } from "@vape/lib/auth";
import { TypeLink } from "@vape/types/general";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayoutBo({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    const links: TypeLink[] = [];

    const rscAllParams = await rscGetAllParams();

    links.push({
        href: "/dashboard",
        label: "Dashboard",
        icon: "home",
        separator: false,
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
                });
            }
        } else {
            links.push({
                href: "/" + rsc.route,
                label: rsc.label,
                icon: rsc.icon,
                separator: separator,
            });
        }
    });

    const labelRole = await resolveLabelRole(user?.role);

    const logo = await getLogo();

    const config = await getVapeConfig();

    const listThemes = await getListThemes();

    return (
        <div className="h-screen flex relative w-screen overflow-hidden">
            <SideBar
                listThemes={listThemes}
                links={links}
                firstName={user?.first_name}
                lastName={user?.last_name}
                role={labelRole}
                version={config.version}
            />
            <div className="w-full relative h-full">
                <header className="w-full h-14 border-b border-0 bg-background md:pr-0 pr-[58px]">
                    <div className="flex justify-between items-center h-full px-3">
                        {/* <div className="flex items-start">
                            <Image
                                src={logo}
                                alt="logo"
                                height={100}
                                width={100}
                                style={{
                                    marginTop: "3px",
                                    marginBottom: "3px",
                                    width: "auto",
                                    height: "50px",
                                }}
                            />
                        </div> */}
                        <CommandBar links={links} />

                        <div className="flex items-center space-x-3">
                            {/* <BugAction /> */}
                            <ModeToggle />
                        </div>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
