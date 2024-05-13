import { X } from "lucide-react";
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

    const buttonClass =
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10";

    return type === "button" ? (
        <Button onClick={() => router.push(genLinkBack())} variant={"secondary"} type="button">
            Annuler
            {/* Cancel */}
        </Button>
    ) : (
        <Button onClick={() => router.back()} variant={"secondary"} type="button">
            <X size={24} strokeWidth={1.6} />
        </Button>
    );
};
