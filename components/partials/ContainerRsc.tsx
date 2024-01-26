"use client"

import { usePathname } from 'next/navigation'

export const ContainerRsc = ({children}:{
    children: React.ReactNode
}) => {

    const pathname = usePathname()
    
    return (<div 
            className="overflow-auto relative" 
            style={{ height: 'calc(100vh - 56px)' }}>
            <div className='p-10'>
                <h1 className="font-semibold text-3xl mb-5">Dashboard {pathname}</h1>

                <main className="space-y-4">
                    {children}
                </main>
            </div>
    </div>)
}