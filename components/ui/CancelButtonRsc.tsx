import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";

export const CancelButtonRsc = ({ type }: { type: "close" | "button" }) => {
    const pathname = usePathname();
    const router = useRouter();
    const genLinkBack = () => {
        const paths = pathname.split("/");
        paths.pop();
        return paths.join("/");
    };

    return type === "button" ? (
        <Button onClick={() => router.push(genLinkBack())} variant={"secondary"} type="button">
            Annuler
            {/* Cancel */}
        </Button>
    ) : (
        <Link
            href={genLinkBack()}
            className="cursor-pointer rounded flex justify-center items-center w-11 h-11 text-destructive-foreground hover:bg-card border"
        >
            <X size={24} strokeWidth={1.6} />
        </Link>
    );
};
