export const color = {
    red: (str: string) => "\x1b[31m" + str + "\x1b[0m",
    green: (str: string) => "\x1b[32m" + str + "\x1b[0m",
    yellow: (str: string) => "\x1b[33m" + str + "\x1b[0m",
    blue: (str: string) => "\x1b[34m" + str + "\x1b[0m",
    magenta: (str: string) => "\x1b[35m" + str + "\x1b[0m",
    cyan: (str: string) => "\x1b[36m" + str + "\x1b[0m",
    white: (str: string) => "\x1b[37m" + str + "\x1b[0m",
    bgCyan: (str: string) => "\x1b[46m" + str + "\x1b[0m",
    reset: "\x1b[0m",
};
