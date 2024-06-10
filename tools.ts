import { QueryCache, QueryObserver, useMutation, useQueries } from "@tanstack/react-query";
import { cn } from "@vape/lib/utils";
import { RefreshCcw } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { queryDeleteByModule, queryDeleteMulitpleByModule } from "./actions/queries";
import Icon from "./components/Icon";
import { useFormGeneral } from "./components/core/modules/form/hook/useFormGeneral";
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

const LR = {
    RefreshCcw,
};

export {
    Controller,
    Icon,
    LR,
    Loading,
    QueryObserver,
    cn,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    useFormContext,
    useFormGeneral,
    useMutation,
    useQueries,
};
