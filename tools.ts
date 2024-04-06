import { useMutation, useQueries } from "@tanstack/react-query";
import { queryDeleteByModule, queryDeleteMulitpleByModule } from "./actions/queries";
import { Loading } from "./components/ui/loading";
import { logger } from "./lib/logs";
import { queryClient } from "./lib/queryClient";

export {
    Loading,
    logger,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    useMutation,
    useQueries,
};
