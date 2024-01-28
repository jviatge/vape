"use client";

import { Badge } from "@vape/components/ui/badge";
import React from "react";

interface BadgeViewProps {
    value: string;
}

const BadgeView: React.FC<BadgeViewProps> = ({ value }) => {
    return (
        <div className="flex items-center">
            <Badge variant={"default"}>{value}</Badge>
        </div>
    );
};

export default BadgeView;
