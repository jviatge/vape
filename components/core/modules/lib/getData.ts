export const resolveStringObject = (char: string, data: Record<string, any>) => {
    if (char.includes(".")) {
        const splits = char.split(".");
        let value = data;
        splits.forEach((split) => {
            value = value[split];
        });
        return value;
    } else {
        return data[char];
    }
};

export const resolveVarStringObject = (str: string, data: Record<string, any>) => {
    if (str.includes("{") && str.includes("}")) {
        return str.replace(/{([^}]*)}/g, (match, key) => resolveStringObject(key, data));
    } else {
        return str;
    }
};
