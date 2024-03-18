import { UseQueryResult } from "@tanstack/react-query";
import { Actions } from "./Actions";
import { ClearFilter } from "./ClearFilter";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";
import { TabsFilter } from "./TabsFilter";
import { Filter } from "./filter/Filter";

export default function Header({
    query,
    config,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    config: {
        Actions?: {
            disabled?: boolean;
        };
        Refresh?: {
            disabled?: boolean;
        };
    };
}) {
    return (
        <div className="flex justify-between items-center md:flex-row flex-col space-y-4 md:space-y-0 w-full">
            <TabsFilter className="w-full md:w-1/4" />
            <SearchInput className="w-full md:w-1/4" />
            <Actions
                query={query}
                disabled={config?.Actions?.disabled}
                className="w-full md:w-1/5"
            />
            <div className="flex items-center justify-between md:justify-end space-x-3 w-full md:w-1/5">
                <Refresh query={query} disabled={config?.Refresh?.disabled} />
                <ClearFilter query={query} />
                <Filter />
            </div>
        </div>
    );
}
