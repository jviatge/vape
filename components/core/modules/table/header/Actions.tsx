import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UseQueryResult } from "@tanstack/react-query";

export const Actions = ({
    query,
    disabled,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    disabled?: boolean;
}) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px] border">
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
