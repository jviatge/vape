"use client";

import {  ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react";
import Icon from "../Icon";
import Link from "next/link";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const SideBar = ({links}:{
    links:{
        href: string
        label: string,
        icon: keyof typeof dynamicIconImports
    }[]
}) => {

    const [minBar, setMinBar] = useState(true)
    const pathname = usePathname()

    return ( 
    <>
    <div 
        style={{width: minBar ? '4rem' : "12rem"}}
        className="h-full border-r border-0 p-1 flex flex-col items-center bg-primary-foreground z-40">
        
        <div className='rounded w-9 h-9 bg-primary m-2 flex justify-center items-center dark:text-primary-foreground' >
        <span className="font-medium">BO</span>
        </div>

        <div className="py-2 space-y-2 h-full flex flex-col justify-between">

            <div>
                <Link
                    href="/dashboard" 
                    className={cn(
                        'cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card',
                        pathname === '/dashboard' && 'bg-card text-destructive-foreground'
                        )}>
                    <Icon name="home" size={26} strokeWidth={1.4} />
                </Link>

                <div className='border-t border-0 my-2 '/>

                {links.map(({href, label, icon}) => (
                    <Link
                        key={label}
                        href={href} 
                        className={cn(
                            'cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card',
                            pathname === href && 'bg-card text-destructive-foreground'
                            )}>
                        <Icon name={icon} size={26} strokeWidth={1.4} />
                    </Link>
                ))}

            </div>

            <div 
                onClick={() => setMinBar(!minBar)}
                className='cursor-pointer rounded flex justify-center items-center w-11 h-11 text-muted-foreground hover:text-destructive-foreground hover:bg-card'>
                    {minBar ?
                        <ChevronRight size={26} strokeWidth={1.4} /> :
                        <ChevronLeft size={26} strokeWidth={1.4} />    
                    }
            </div>
        
        </div>
    </div>
    
    {!minBar && <div className="absolute h-full w-full bg-black z-30 opacity-50" />}
 
    </>
    )
}