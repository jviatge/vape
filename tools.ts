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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    QueryCache,
    QueryObserver,
    useMutation,
    useQueries,
    useQuery,
} from "@tanstack/react-query";
import { Calendar } from "@vape/components/ui/calendar";
import { cn } from "@vape/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown, Search, TrendingUp } from "lucide-react";
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
import { useFormGeneral } from "./components/modules/form/hook/useFormGeneral";
import { resolveDate } from "./components/modules/table/header/filter/fields/DatesRangeFilter";
import { Button } from "./components/ui/button";
import { FormLabel } from "./components/ui/form";
import { Input } from "./components/ui/input";
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
    Bar,
    BarChart,
    Button,
    Calendar,
    CalendarIcon,
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
    ChevronDown,
    cn,
    Controller,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    format,
    FormLabel,
    fr,
    Icon,
    Input,
    Label,
    LabelList,
    Loading,
    Pie,
    PieChart,
    Popover,
    PopoverContent,
    PopoverTrigger,
    queryCache,
    queryClient,
    queryDeleteByModule,
    queryDeleteMulitpleByModule,
    queryGetByModule,
    QueryObserver,
    resolveDate,
    Search,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TrendingUp,
    useFormContext,
    useFormGeneral,
    useMutation,
    useQueries,
    useQuery,
    XAxis,
    YAxis,
};
