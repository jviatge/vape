"use client";

import { Calendar } from "lucide-react";
import React from "react";

interface DateViewProps {
    value: string;
}

const DateView: React.FC<DateViewProps> = ({ value }) => {
    return (
        <div className="flex items-center">
            <Calendar size={23} strokeWidth={1} className="inline-block mr-2 text-primary" />
            <span>
                {new Date(value).toLocaleDateString("fr", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                })}
            </span>
        </div>
    );
};

export default DateView;
