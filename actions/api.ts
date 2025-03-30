"use server";

import { logApi } from "@vape/lib/logs";
import { NextRequest } from "next/server";

export const getActionApiBySegements = async (
    request: NextRequest,
    segements: string[],
    type: "GET" | "POST",
    data?: any | null,
    session?: any
): Promise<any> => {
    logApi(`[getActionApiBySegements] | ${type} => ${JSON.stringify(segements)}`);
    try {
        let pathAction = segements.join("/");

        switch (type) {
            case "GET":
                pathAction = pathAction + "/get";
                break;
            case "POST":
                pathAction = pathAction + "/post";
                break;
            default:
                throw new Error("Action not found");
        }

        const actionApi = await import("~/api/" + pathAction).then((module) => module.default);
        return await actionApi(request, data, session);
    } catch {
        return undefined;
    }
};
