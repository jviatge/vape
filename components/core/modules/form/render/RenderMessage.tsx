"use client";

import { Span, resolveSpanClass } from "@vape/lib/resolveGrid";
import { Info } from "lucide-react";

export const RenderMessage = ({ messages, span }: { messages: string[]; span?: Span }) => {
    return (
        <div className={`flex flex-col relative ${resolveSpanClass(span)} text-yellow-500 text-sm`}>
            <div className="w-full flex gap-2 items-center">
                <Info className="" />
                <ul>
                    {messages
                        .filter(function (item, pos) {
                            return messages.indexOf(item) == pos;
                        })
                        .map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                </ul>
            </div>
        </div>
    );
};
