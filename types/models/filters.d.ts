import { Query } from "@vape/components/modules/table/context/Table.context";

export type FilterModel = {
    query: Query;
    searchInputField: undefined | string[];
};
