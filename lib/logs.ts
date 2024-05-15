"use server";

import fs from "fs";
import path from "path";
import { color } from "./color";
import { formatDate } from "./formatDate";

const dateNow = () => `[${formatDate(new Date())}]`;

export const logSuccess = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.green(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logInfo = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.cyan(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logError = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.red(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logWarning = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.yellow(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logQuery = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.magenta(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logServerAction = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.cyan(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logRsc = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.green(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

export const logApi = (message: string) => {
    const logMessage = `${color.blue(dateNow())} ${color.bgCyan(message)}`;
    console.log(logMessage);
    saveLogFileDaily(message);
};

const saveLogFileDaily = (message: string) => {
    const logsPath = path.join(process.cwd(), "../logs");

    const formatDateOk = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois commencent à 0, donc on ajoute 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath);
    }

    const nameFile = `../logs/log-${formatDateOk(new Date())}.txt`;

    fs.appendFile(nameFile, `[${new Date().toISOString()}] : ${message}\n`, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
};
