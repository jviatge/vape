import { ModeToggle } from "@/components/ModeToggle";
import { SideBar } from "@/components/partials/SideBar";
import { rscGetAllParams } from "@vape/actions/resources";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export default async function RootLayoutBo({ children }: { children: React.ReactNode }) {
    const links: {
        href: string;
        label: string;
        icon: keyof typeof dynamicIconImports;
        separator?: boolean;
    }[] = [];

    const rscAllParams = await rscGetAllParams();

    rscAllParams.map((rsc) => {
        links.push({
            href: "/" + rsc.route,
            label: rsc.label,
            icon: rsc.icon,
            separator: rsc.separator ?? false,
        });
    });

    return (
        <div className="h-screen flex bg-background relative">
            <SideBar links={links} />
            <div className="w-full relative">
                <header className="w-full h-14 border-b border-0 bg-primary-foreground">
                    <div className="flex justify-between items-center h-full px-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-secondary"></div>
                            <span>Bryan Tellez</span>
                        </div>
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
