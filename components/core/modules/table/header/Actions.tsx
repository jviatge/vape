import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UseQueryResult } from "@tanstack/react-query";
import { cn } from "@vape/lib/utils";

export const Actions = ({
    query,
    disabled,
    className,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    disabled?: boolean;
    className?: string;
}) => {
    return (
        <Select>
            <SelectTrigger className={cn("border", className)}>
                <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
    );
};
