import { QueryCache, QueryObserver, useMutation, useQueries } from "@tanstack/react-query";
import { cn } from "@vape/lib/utils";
import { queryDeleteByModule, queryDeleteMulitpleByModule } from "./actions/queries";
import Icon from "./components/Icon";
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
    Icon,
    Loading,
    QueryObserver,
    cn,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    useMutation,
    useQueries,
};
