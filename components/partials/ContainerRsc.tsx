"use client"

import { usePathname } from 'next/navigation'

export const ContainerRsc = ({children}:{
    children: React.ReactNode
}) => {

    const pathname = usePathname()

    return (<div className="h-auto p-10">
          
        <h1 className="font-semibold text-3xl mb-5">
        Dashboard {pathname}
        </h1>

        <div className="space-y-4">
            {children}
        </div>

  </div>)
}