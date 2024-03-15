import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { RefreshCcw } from "lucide-react";

export const Refresh = ({
    query,
    disabled,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    disabled?: boolean;
}) => {
    return disabled ? null : (
        <Button
            disabled={query.getAll.isFetching || query.getAll.isLoading}
            variant={"secondary"}
            className="border"
            type="button"
            onClick={() => query.getAll.refetch()}
        >
            <RefreshCcw className="pointer-events-none" size={18} />
        </Button>
    );
};
