export const resolveStringObject = (char: string, data: Record<string, any>) => {
    if (char.includes(".")) {
        const splits = char.split(".");
        let value: any = data;
        splits.forEach((split) => {
            if (value[split]) {
                value = value[split];
            } else {
                value = "-";
            }
        });
        /* if (keys) {
            keys.map((key) => {
                if (value[key]) {
                    value += value[key];
                } else {
                    value = "-";
                }
            });
        } */
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
