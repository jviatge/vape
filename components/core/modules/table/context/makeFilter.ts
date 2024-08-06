export class makeFilter {
    public static clearKey = (prev: any, key: string) => {
        console.log("delete ------>", key, {
            ...prev,
            [key]: null,
        });
        return {
            ...prev,
            [key]: null,
        };
    };

    public static search = (prev: any, value: any) => {
        return {
            ...prev,
            search: value,
        };
    };

    public static page = (prev: any) => ({
        ...prev,
        page: {
            ...prev.page,
            number: undefined,
        },
    });

    public static sort = (
        prev: any,
        field: string | undefined,
        value: string | boolean | undefined,
        action: "add" | "delete"
    ) => {
        if (!field) return prev;

        if (action === "add") {
            if (field.includes(".")) {
                const fields = field.split(".");
                return {
                    ...prev,
                    sort: {
                        ...prev.sort,
                        ...fields.reduceRight((acc: any, keyR) => {
                            return { [keyR]: acc };
                        }, value),
                    },
                };
            }
            return {
                ...prev,
                sort: {
                    ...prev.sort,
                    [field]: value,
                },
            };
        } else {
            const sort = { ...prev.sort };
            if (field.includes(".")) {
                const fields = field.split(".");
                delete sort[fields[0]];
            } else {
                delete sort[field];
            }
            return {
                ...prev,
                sort,
            };
        }
    };

    public static where = (
        prev: any,
        key: string | undefined,
        field: string | undefined,
        value: string | boolean | undefined,
        action: "add" | "delete"
    ) => {
        if (!key || !field) return prev;
        if (action === "add") {
            if (field.includes(".")) {
                const fields = field.split(".");
                if (fields[fields.length - 1].includes("|")) {
                    const keys = fields[fields.length - 1].split("|");
                    if (fields.length === 3) {
                        return {
                            ...prev,
                            [key]: {
                                [fields[0] + "." + fields[1]]: {
                                    OR: [
                                        {
                                            [keys[0]]: { [key]: value },
                                        },
                                        {
                                            [keys[1]]: { [key]: value },
                                        },
                                    ],
                                },
                            },
                        };
                    }
                    return {
                        ...prev,
                        [key]: {
                            [fields[0]]: {
                                OR: [
                                    {
                                        [keys[0]]: { [key]: value },
                                    },
                                    {
                                        [keys[1]]: { [key]: value },
                                    },
                                ],
                            },
                        },
                    };
                }
                return {
                    ...prev,
                    [key]: {
                        ...prev[key],
                        ...fields.reduceRight((acc: any, keyR) => {
                            return { [keyR]: acc };
                        }, value),
                    },
                };
            }
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    [field]: String(value),
                },
            };
        } else {
            const prevResolve = {
                ...prev,
            };
            if (field.includes(".")) {
                const fields = field.split(".");
                delete prevResolve[key][fields[0]];
            } else {
                delete prevResolve[key][field];
            }
            /* delete prevResolve[key]["client"]; */
            console.log("-------------------------");
            console.log({
                prev,
                key,
                field,
                value,
                action,
            });
            console.log({
                prevResolve,
            });
            console.log("-------------------------");

            return prevResolve;
        }
    };
}
