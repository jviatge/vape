import dynamicIconImports from "lucide-react/dynamicIconImports";

export type TypeLink = {
    href: string;
    label: string;
    icon: keyof typeof dynamicIconImports;
    separator?: boolean;
};
