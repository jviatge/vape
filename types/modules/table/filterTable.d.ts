export type BaseFilter = {
    label?: string;
};

export type Filter =
    | FilterRelation
    | FilterContains
    | FilterDatesRange
    | FilterSelect
    | FilterNumber
    | FilterBoolean;

export type FilterNumber = {
    type: "number";
} & BaseFilter;

export type FilterBoolean = {
    type: "boolean";
} & BaseFilter;

export type FilterContains = {
    type: "contains";
} & BaseFilter;

export type FilterDatesRange = {
    type: "datesRange";
} & BaseFilter;

export type FilterSelect = {
    type: "select";
    options: {
        value: string;
        label: string;
        minLabel?: string;
        color?: string;
    }[];
} & BaseFilter;

export type FilterRelation = {
    type: "selectRelation";
    optionsQueries: {
        getValueFrom: string;
        queryKeys: string[];
        valueShowInit: string;
        valueShowSelect: string;
    };
} & BaseFilter;
