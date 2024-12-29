"use client";

export const CopyToClipboard = ({
    text,
    onCopy,
    children,
}: {
    text: string;
    onCopy?: () => void;
    children: React.ReactNode;
}) => {
    const copyToClipboard = async (e: React.MouseEvent) => {
        await navigator.clipboard.writeText(text);
        onCopy?.();
        (e.target as HTMLElement).focus();
    };

    return <button onClick={copyToClipboard}>{children}</button>;
};
