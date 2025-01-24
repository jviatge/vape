import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { InfosHover } from "@vape/components/ui/infos-hover";
import { RefreshCcw } from "lucide-react";
import { useContext } from "react";
import TableContext from "../context/Table.context";

export const Refresh = ({
    query,
    disabled,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    disabled?: boolean;
}) => {
    const TC = useContext(TableContext);

    return disabled || TC.modeSelect ? null : (
        <InfosHover message="Actualise les données">
            <Button
                disabled={query.getAll.isFetching || query.getAll.isLoading}
                variant={"secondary"}
                className="border"
                type="button"
                onClick={() => query.getAll.refetch()}
            >
                <RefreshCcw className="pointer-events-none" size={18} />
            </Button>
        </InfosHover>
    );
};
