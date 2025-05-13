export function formatDate(d: Date | string | null, noHour?: boolean) {
    if (!d) {
        return "";
    }

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
