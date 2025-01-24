import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../../ui/button";

export const Signout = () => {
    return (
        <Button
            type="button"
            className="ml-3"
            variant={"outline"}
            size="icon"
            onClick={() => signOut()}
        >
            <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
    );
};
