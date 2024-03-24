import { useMutation, useQueries } from "@tanstack/react-query";
import { queryDeleteByModule, queryDeleteMulitpleByModule } from "./actions/queries";
import { Loading } from "./components/ui/loading";
import { queryClient } from "./lib/queryClient";

export {
    Loading,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    useMutation,
    useQueries,
};
