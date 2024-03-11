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
