export const resolveSearchInput = (searchInput?: string, fields?: string[]) => {
    if (searchInput && fields) {
        return {
            OR: fields.map((field) => {
                return {
                    [field]: {
                        contains: searchInput,
                    },
                };
            }),
        };
    } else {
        return {};
    }
};

export const resolveSort = (sort?: Record<string, string>) => {
    if (sort && Object.keys(sort).length > 0) {
        return Object.entries(sort).map(([key, value]) => {
            return {
                [key]: value,
            };
        });
    } else {
        return [];
    }
};
