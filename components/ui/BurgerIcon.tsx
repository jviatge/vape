import { cn } from "@vape/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "./button";

export const BurgerIcon = ({ onClick, isOpen }: { onClick?: () => void; isOpen?: boolean }) => {
    const buttonClass =
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10";

    return (
        <Button
            className={cn(buttonClass, "z-50")}
            variant="outline"
            size="icon"
            type="button"
            onClick={onClick}
        >
            {isOpen ? (
                <X className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
                <Menu className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
        </Button>
    );
};
