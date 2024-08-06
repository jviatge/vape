import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { QueryCache, QueryObserver, useMutation, useQueries } from "@tanstack/react-query";
import { cn } from "@vape/lib/utils";
import { RefreshCcw, TrendingUp } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, YAxis } from "recharts";
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
    Bar,
    BarChart,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CartesianGrid,
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    cn,
    Controller,
    Icon,
    Label,
    Loading,
    LR,
    Pie,
    PieChart,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    QueryObserver,
    TrendingUp,
    useFormContext,
    useFormGeneral,
    useMutation,
    useQueries,
    XAxis,
    YAxis,
};
