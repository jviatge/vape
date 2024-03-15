import { UseQueryResult } from "@tanstack/react-query";
import { Actions } from "./Actions";
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
            <TabsFilter />
            <SearchInput />
            <Actions query={query} disabled={config?.Actions?.disabled} />
            <div className="flex items-center space-x-3">
                <Refresh query={query} disabled={config?.Refresh?.disabled} />
                <Filter />
            </div>
        </div>
    );
}
