export const getConfg = async (): Promise<undefined | any> => {
    try {
        return await import("~/vape.config").then((module) => module.default);
    } catch (error) {
        console.error(error);
        return undefined;
    }
};
