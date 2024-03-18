import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

export const InfosHover = ({
    children,
    message,
}: {
    children: React.ReactNode;
    message: string;
}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>{children}</HoverCardTrigger>
            <HoverCardContent>
                <div className="text-center text-sm flex items-center justify-center">
                    <InfoIcon size={18} className="mr-3" />
                    <p>{message}</p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
