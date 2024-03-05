import { Actions } from "./Actions";
import { Filter } from "./Filter";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";
import { TabsFilter } from "./TabsFilter";

export default function Header() {
    return (
        <div className="space-y-4 mb-4">
            <TabsFilter />
            <div className="flex justify-between items-center">
                <SearchInput />
                <Actions />
                <div className="flex items-center space-x-3">
                    <Refresh />
                    <Filter />
                </div>
            </div>
        </div>
    );
}
