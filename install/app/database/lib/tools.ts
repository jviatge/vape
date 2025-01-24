export function randomLength(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export async function reapeatArrValue(func: Function, times: number) {
    const arr = [];
    for (let i = 0; i < times; i++) {
        arr.push(await func());
    }
    return arr;
}

export const formatSQLin = (arrStr: string[]): string => {
    const acc: string[] = [];
    arrStr.map((item: string) => {
        acc.push(`"${item}"`);
    });
    return acc.join(",").toString();
};
