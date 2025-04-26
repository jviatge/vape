export function formatDate(d: Date | string, noHour?: boolean) {
    if (typeof d === "string") {
        d = new Date(d);
    }
    const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return (
        [padL(d.getDate()), padL(d.getMonth() + 1), d.getFullYear()].join("/") +
        (!noHour
            ? " " + [padL(d.getHours()), padL(d.getMinutes()), padL(d.getSeconds())].join(":")
            : "")
    );
}

export function formatDateStringToDB(d?: string) {
    if (d) {
        const nd = new Date(d);
        return new Date(Date.UTC(nd.getFullYear(), nd.getMonth(), nd.getDate()));
    } else {
        return null;
    }
}

export const gmtResolve = (date: Date) => date.setHours(date.getHours() + 2);
