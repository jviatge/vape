import { UseQueryResult } from "@tanstack/react-query";
import { Actions } from "./Actions";
import { ClearFilter } from "./ClearFilter";
import { Columns } from "./Columns";
import { Filter } from "./filter/Filter";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";
import { TabsFilter } from "./TabsFilter";
import { TrashMode } from "./TrashMode";

export default function Header({
    query,
    config,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    config: {
        Refresh?: {
            disabled?: boolean;
        };
    };
}) {
    return (
        <div className="flex justify-between items-center md:flex-row flex-col space-y-4 md:space-y-0 w-full mb-4">
            <TabsFilter />
            <SearchInput />
            <Actions />
            <div className="flex items-center justify-between md:justify-end space-x-3">
                <Refresh query={query} disabled={config?.Refresh?.disabled} />
                <ClearFilter query={query} />
                <Filter />
                <Columns />
                <TrashMode />
            </div>
        </div>
    );
}
