import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Query } from "../context/Table.context";

const decodeURI = (uri: string) => {
    return decodeURIComponent(uri);
};

const useParamsTable = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const get = (key: string, subKey?: string): string => {
        if (subKey) {
            return params.get(`[${key}][${subKey}]`) as string;
        }
        if (params.get(key)) return params.get(`[${key}]`) as string;
        return "";
    };

    const set = (value: string | null, key: string, subKey?: string) => {
        const newParams = new URLSearchParams(params);

        //// DELETE PARAMS PAGE IF NOT EXIST IN QUERY
        const page = get("page", "number");
        if (key !== "page" && page) newParams.delete(`[page][number]`);

        if (!value) {
            if (subKey) {
                newParams.delete(`[${key}][${subKey}]`);
            } else {
                newParams.delete(`[${key}]`);
            }
        } else {
            if (subKey) {
                newParams.set(`[${key}][${subKey}]`, value);
            } else {
                newParams.set(`[${key}]`, value);
            }
        }
        /* console.log(`${pathname}?${newParams}`); */
        router.push(`${pathname}?${newParams}`);
    };

    const getAll = (): Query => {
        const limitDefault = 25;

        const query: Query = {
            get: null,
            search: null,
            sort: {},
            select: {},
            contains: {},
            boolean: {},
            datesRange: {},
            equals: {},
            page: {
                limit: limitDefault,
            },
        };
        decodeURI(params.toString())
            .split("&")
            .map((param) => {
                if (param.includes("[") && param.includes("]")) {
                    const value = param.split("=")[1];
                    const keys = param.split("=")[0].replace("]", "").split("[");

                    const resolveKey: string[] = [];

                    keys.map((key, index) => {
                        if (!key.includes("]") && key) {
                            resolveKey.push(key);
                        }
                        if (key.includes("]")) {
                            resolveKey.push(key.replace("]", ""));
                        }
                        return;
                    });

                    if (resolveKey[0] === "get") {
                        query.get = value;
                    }
                    if (resolveKey[0] === "sort") {
                        query.sort[resolveKey[1]] = value as "asc" | "desc";
                    }
                    if (resolveKey[0] === "select") {
                        query.select[resolveKey[1]] = value;
                    }
                    if (resolveKey[0] === "contains") {
                        query.contains[resolveKey[1]] = value;
                    }
                    if (resolveKey[0] === "boolean") {
                        query.boolean[resolveKey[1]] = value === "true";
                    }
                    if (resolveKey[0] === "datesRange") {
                        query.datesRange[resolveKey[1]] = value;
                    }
                    if (resolveKey[0] === "equals") {
                        query.equals[resolveKey[1]] = value;
                    }
                    if (resolveKey[0] === "search") {
                        query.search = value;
                    }
                    if (resolveKey[0] === "page") {
                        query.page = {
                            number: Number(value),
                            limit: limitDefault,
                        };
                    }
                }
            });
        return query;
    };

    const clear = (key: string) => {
        const newParams = new URLSearchParams(params);
        newParams.delete(key);
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const clearAll = () => {
        router.push(pathname);
    };

    return {
        get,
        set,
        getAll,
        clear,
        clearAll,
    };
};

export default useParamsTable;
