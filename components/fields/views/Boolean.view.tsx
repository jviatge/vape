"use client";

import { Check, X } from "lucide-react";
import React from "react";

interface BooleanViewProps {
    value: boolean;
}

const BooleanView: React.FC<BooleanViewProps> = ({ value }) => {
    return (
        <span>{value ? <Check className="text-green-500" /> : <X className="text-red-500" />}</span>
    );
};

export default BooleanView;
