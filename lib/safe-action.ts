import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const authenicatedAction = createSafeActionClient({
    async middleware() {},
});
