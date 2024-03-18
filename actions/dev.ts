"use server";

/* import db from "@vape/db"; */
import { devAction } from "@vape/lib/safe-action";
import { z } from "zod";
/* import { seed } from "~/prisma/seed"; */

export const seedDB = devAction(
    z.object({
        reset: z.boolean(),
    }),
    async () => {
        /* console.log("Seeding database...");
        return seed()
            .then(async () => {
                await db.$disconnect();
            })
            .catch(async (e) => {
                console.error(e);
                await db.$disconnect();
                process.exit(1);
            }); */
    }
);
