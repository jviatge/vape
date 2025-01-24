"use client";

import { Clock } from "lucide-react";
import React from "react";

interface HourViewProps {
    value: string;
}

const HourView: React.FC<HourViewProps> = ({ value }) => {
    return (
        <div className="flex items-center">
            <Clock size={23} strokeWidth={1} className="inline-block mr-2 text-primary" />
            <span>
                {new Date(value).toLocaleTimeString("fr", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </span>
        </div>
    );
};

export default HourView;
