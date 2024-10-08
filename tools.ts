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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    QueryCache,
    QueryObserver,
    useMutation,
    useQueries,
    useQuery,
} from "@tanstack/react-query";
import { cn } from "@vape/lib/utils";
import { RefreshCcw, TrendingUp } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    LabelList,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts";
import {
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    queryGetByModule,
} from "./actions/queries";
import Icon from "./components/Icon";
import { useFormGeneral } from "./components/core/modules/form/hook/useFormGeneral";
import { Button } from "./components/ui/button";
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
    Button,
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
    LabelList,
    Loading,
    LR,
    Pie,
    PieChart,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    queryGetByModule,
    QueryObserver,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    TrendingUp,
    useFormContext,
    useFormGeneral,
    useMutation,
    useQueries,
    useQuery,
    XAxis,
    YAxis,
};
