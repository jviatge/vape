import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

interface IconProps extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

const _Icon = ({ name, ...props }: IconProps) => {
    const LucideIcon = useMemo(() => dynamic(dynamicIconImports[name]), [name]);

    return <LucideIcon {...props} />;
};

// 🩹 Fix for unnecessary re-renders
const Icon = React.memo(_Icon);

export default Icon;
