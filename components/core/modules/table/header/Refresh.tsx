import { Button } from "@vape/components/ui/button";
import { RefreshCcw } from "lucide-react";

export const Refresh = () => {
    return (
        <Button variant={"secondary"} className="border">
            <RefreshCcw className="pointer-events-none" size={18} />
        </Button>
    );
};
