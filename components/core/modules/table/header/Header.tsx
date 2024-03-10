import { UseQueryResult } from "@tanstack/react-query";
import { Actions } from "./Actions";
import { Filter } from "./Filter";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";
import { TabsFilter } from "./TabsFilter";

export default function Header({
    query,
    config,
}: {
    query: {
        getAll: UseQueryResult<any, Error>;
    };
    config: {
        SearchInput?: {
            disabled?: boolean;
        };
        Actions?: {
            disabled?: boolean;
        };
        Refresh?: {
            disabled?: boolean;
        };
        Filter?: {
            disabled?: boolean;
        };
    };
}) {
    return (
        <div className="space-y-4 mb-4">
            <TabsFilter />
            <div className="flex justify-between items-center md:flex-row flex-col space-y-4 md:space-y-0 w-full">
                <SearchInput query={query} disabled={config?.SearchInput?.disabled} />
                <Actions query={query} disabled={config?.Actions?.disabled} />
                <div className="flex items-center space-x-3">
                    <Refresh query={query} disabled={config?.Refresh?.disabled} />
                    <Filter query={query} disabled={config?.Filter?.disabled} />
                </div>
            </div>
        </div>
    );
}
