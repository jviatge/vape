import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { InfosHover } from "@vape/components/ui/infos-hover";
import { Eraser } from "lucide-react";
import { useContext } from "react";
import TableContext from "../context/Table.context";

export const ClearFilter = ({
    query,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
}) => {
    const TC = useContext(TableContext);

    return !TC.modeSelect ? (
        <InfosHover message={"Supprimer tous les filtres"}>
            <Button
                disabled={query.getAll.isFetching || query.getAll.isLoading || TC.queryCount() <= 0}
                variant={"secondary"}
                className="border"
                type="button"
                onClick={() => TC.deleteAllQuery()}
            >
                <Eraser className="pointer-events-none" size={18} />
            </Button>
        </InfosHover>
    ) : null;
};
