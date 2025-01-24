export const resolveIDs = (data: Record<string, any> | Record<string, any>[]) => {
    if (Array.isArray(data)) {
        return data.map((item) => String(item.id));
    }
    return data?.id ? [String(data.id)] : [];
};
