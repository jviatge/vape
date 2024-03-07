"use client";

import { cn } from "@vape/lib/utils";

export const CardUser = ({
    firstName,
    lastName,
    role,
    open,
}: {
    role: string;
    open?: boolean;
    firstName: string;
    lastName: string;
}) => {
    return (
        <div className="bg-grey-700">
            <div className={"p-3"}>
                <div className="relative text-grey-0">
                    <div>
                        <button type="button" className="flex text-sm rounded-full ">
                            <div className="block cursor-pointer w-full rounded-t text-left p12-m ">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary transition text-primary-foreground">
                                            <span className="p12-b tracking-tighter capitalize">
                                                {firstName[0]}
                                                {lastName[0]}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            "text-sm text-nowrap transition-all overflow-hidden ",
                                            open ? "w-full" : "w-0"
                                        )}
                                    >
                                        <div>
                                            {firstName} {lastName}
                                        </div>
                                        <div className="text-grey-100 p10-m ita">{role}</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

{
    /* <svg
                    className="absolute w-11 h-11 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                    ></path>
                </svg> */
}
