export function randomLength(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function reapeatArrValue(func: Function, times: number) {
    const arr = [];
    for (let i = 0; i < times; i++) {
        arr.push(func());
    }
    return arr;
}
