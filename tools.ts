import { QueryCache, useMutation, useQueries } from "@tanstack/react-query";
import { queryDeleteByModule, queryDeleteMulitpleByModule } from "./actions/queries";
import { Loading } from "./components/ui/loading";
import { queryClient } from "./lib/queryClient";

const queryCache = new QueryCache({
    onError: (error) => {
        console.log(error);
    },
    onSuccess: (data) => data,
    onSettled: (data, error) => {
        console.log(data, error);
    },
});

export {
    Loading,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    useMutation,
    useQueries,
};
