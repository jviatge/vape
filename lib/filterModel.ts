import { Query } from "@vape/components/core/modules/table/context/Table.context";
import { FilterModel } from "@vape/types/model.type";
import { isValid } from "date-fns";

type Pagination = {
    totalCount?: number;
    totalPage?: number;
    currentPage?: number;
    next?: {
        page: number;
        limit: number;
    };
    previous?: {
        page: number;
        limit: number;
    };
    last?: {
        page: number;
        limit: number;
    };
    paginateData?: any;
    currentCountPerPage?: number;
    range?: number;
};

const paginateAndFilter = async (
    filterModel: FilterModel,
    callbackCount: (filter: any) => Promise<number>,
    callbackGet: (limit: number, startIndex: number, filter: any) => Promise<any>
) => {
    const filter = makeFilter(filterModel.query, filterModel.searchInputField);
    const query = filterModel.query;

    try {
        return await makePaginate(query, callbackCount, callbackGet, filter);
    } catch (error: any) {
        throw { status: 500, message: error?.message || error };
    }
};

const filter = (filterModel: FilterModel, callbackGet: (filter: any) => Promise<any>) => {
    const filter = makeFilter(filterModel.query, filterModel.searchInputField);
    /* const query = filterModel.query; */

    try {
        return callbackGet(filter);
    } catch (error: any) {
        throw { status: 500, message: error?.message || error };
    }
};

const makeFilter = (query: Query, searchInputField: FilterModel["searchInputField"]) => {
    let orderBy = [{ id: "desc" }] as Array<Record<string, string>>;
    let where = {} as Record<string, any>;

    if (query.search && searchInputField) {
        where = {
            OR: searchInputField.map((field) => {
                return {
                    [field]: {
                        contains: query.search,
                    },
                };
            }),
        };
    }

    if (typeof query.sort === "object") {
        let sortQuery = query.sort as any;
        orderBy = [];
        for (const key in sortQuery) {
            orderBy.push({
                [key]: sortQuery[key],
            });
        }
    }

    if (typeof query.contains === "object") {
        const containsQuery = query.contains as any;
        for (const key in containsQuery) {
            if (containsQuery[key].OR) {
                where[key] = {
                    OR: containsQuery[key].OR.map((value: string) => {
                        return value;
                    }),
                };
            } else {
                where[key] = {
                    contains: containsQuery[key],
                };
            }
        }
    }

    if (typeof query.equals === "object") {
        const equalsQuery = query.equals as any;
        for (const key in equalsQuery) {
            where[key] = {
                equals: Number(equalsQuery[key]),
            };
        }
    }

    if (typeof query.select === "object") {
        const selectQuery = query.select as any;
        for (const key in selectQuery) {
            where[key] = {
                in: selectQuery[key].split(","),
            };
        }
    }

    if (typeof query.boolean === "object") {
        const booleanQuery = query.boolean as any;
        for (const key in booleanQuery) {
            where[key] = {
                equals: JSON.parse(booleanQuery[key]),
            };
        }
    }

    if (typeof query.datesRange === "object") {
        const datesRangeQuery = query.datesRange as any;
        for (const key in datesRangeQuery) {
            const splitDate = datesRangeQuery[key].split("[to]");
            const from = new Date(String(splitDate[0]).replace("[from]", ""));
            const to = isValid(new Date(splitDate[1]))
                ? new Date(
                      new Date(String(splitDate[1]).replace("[to]", "")).setHours(23, 59, 59, 999)
                  )
                : new Date(new Date(from).setHours(23, 59, 59, 999));

            where[key] = {
                gte: from,
                ...(to && { lte: to }),
            };
        }
    }

    return {
        where,
        orderBy,
    };
};

const makePaginate = async (
    query: Query,
    callbackCount: (filter: any) => Promise<number>,
    callbackGet: (limit: number, startIndex: number, filter: any) => Promise<any>,
    filter: any
) => {
    const page = Number(query.page?.number) || 1;
    const limit = Number(query.page?.limit) || 50;
    const last_page = query.page?.lastPage;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result: Pagination = {};

    const totalCount = await callbackCount(filter);

    const totalPage = Math.ceil(totalCount / limit);
    const currentPage = page || 0;

    try {
        result.paginateData = await callbackGet(limit, startIndex, filter);
    } catch (err) {
        return { error: err };
    }

    try {
        if (page < 0) {
            return {
                status: 400,
                error: "Page value should not be negative",
            };
        } else if (page === 1 && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.next = {
                page: page + 1,
                limit: limit,
            };
            result.currentCountPerPage = Object.keys(result.paginateData).length;
            result.range = currentPage * limit;
            return result;
        } else if (endIndex < totalCount && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.next = {
                page: page + 1,
                limit: limit,
            };

            result.currentCountPerPage = Object.keys(result.paginateData).length;
            result.range = currentPage * limit;
            return result;
        } else if (startIndex > 0 && !last_page) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = currentPage;
            result.previous = {
                page: page - 1,
                limit: limit,
            };

            result.currentCountPerPage = Object.keys(result.paginateData).length;
            result.range = currentPage * limit;
            return result;
        } else if (last_page === true && page === totalPage) {
            result.totalCount = totalCount;
            result.totalPage = totalPage;
            result.currentPage = totalPage;
            result.last = {
                page: totalPage,
                limit: limit,
            };

            result.currentCountPerPage = Object.keys(result.paginateData).length;
            result.range = totalCount;
            return result;
        } else {
            return {
                status: 404,
                error: "Resource not found",
            };
        }
    } catch (err) {
        console.error("error", err);
        return { error: err };
    }
};

export { filter, paginateAndFilter };
