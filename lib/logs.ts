import { color } from "./color";
import { formatDate } from "./formatDate";

const dateNow = () => `[${formatDate(new Date())}]`;

export const logSuccess = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.green(message)}`;
    console.log(logMessage);
};

export const logInfo = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.cyan(message)}`;
    console.log(logMessage);
};

export const logError = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.red(message)}`;
    console.log(logMessage);
};

export const logWarning = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.yellow(message)}`;
    console.log(logMessage);
};

export const logQuery = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.magenta(message)}`;
    console.log(logMessage);
};

export const logServerAction = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.cyan(message)}`;
    console.log(logMessage);
};

export const logRsc = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.green(message)}`;
    console.log(logMessage);
};

export const logApi = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.bgCyan(message)}`;
    console.log(logMessage);
};

export class logger {
    private static instance: logger;

    private constructor() {}

    static getInstance() {
        if (!logger.instance) {
            logger.instance = new logger();
        }
        return logger.instance;
    }

    success(message: string) {
        logSuccess(message);
    }

    info(message: string) {
        logInfo(message);
    }

    error(message: string) {
        logError(message);
    }

    warning(message: string) {
        logWarning(message);
    }
}
