"use server";

import { NextRequest } from "next/server";

export const getActionApiBySegements = async (
    request: NextRequest,
    segements: string[],
    type: "GET" | "POST",
    data?: any | null
): Promise<any> => {
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
        return actionApi(request, data);
    } catch {
        return undefined;
    }
};
