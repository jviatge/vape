export const useLocal = () => {
    const switchLocal = (lang: string) => {};
    const currentLocal = () => {
        return "FR";
    };
    const availableLocals = () => ["FR", "US"];
    const T = (key: string) => key;
    return {
        switchLocal,
        currentLocal,
        availableLocals,
        T,
    };
};
