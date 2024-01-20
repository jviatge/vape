import { SideBar } from "@/components/partials/SideBar"
import { rscGetAllParams } from "@vape/actions/resources"
import { ModeToggle } from "@/components/ModeToggle"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import { ContainerRsc } from "@/components/partials/ContainerRsc"

export default async function RootLayoutBo({
  children
}: {
  children: React.ReactNode
}) {
  const links:{
    href: string
    label: string
    icon: keyof typeof dynamicIconImports
  }[] = []

  const rscAllParams = await rscGetAllParams()

  rscAllParams.map((rsc) => {
    links.push({
      href: "/" + rsc.route,
      label: rsc.label,
      icon: rsc.icon,
    })
  })

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
        
        <ContainerRsc>
          {children}
        </ContainerRsc>

      </div>
    </div>
  )
}
