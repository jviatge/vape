import { Input } from "@vape/components/ui/input";
import useDidMountEffect from "@vape/hooks/useDidMountEffect";
import { cn } from "@vape/lib/utils";
import { Search, X } from "lucide-react";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TableContext from "../context/Table.context";
import useParamsTable from "../hook/useParamsTable";

type Inputs = {
    search: string;
};

export const SearchInput = ({ className }: { className?: string }) => {
    const TC = useContext(TableContext);
    const { get } = useParamsTable();
    const { register, handleSubmit, reset, setValue, watch } = useForm<Inputs>();

    const watchSearch = watch("search");

    useDidMountEffect(() => {
        setValue("search", get("search"));
        return () => {};
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        TC.setQueryValue("search", "add", undefined, data.search);
    };

    const handleRemoveSearch = () => {
        TC.setQueryValue("search", "delete", undefined);
        reset();
    };

    return TC.tableBuilder.searchInputField ? (
        <div className={cn("flex flex-col", className)}>
            <form className="flex items-center relative" onSubmit={handleSubmit(onSubmit)}>
                <button
                    disabled={!watchSearch || TC.loading}
                    type="submit"
                    className={cn(
                        "h-10 flex items-center bg-primary-foreground rounded-l-md border-l border-y cursor-pointer",
                        watchSearch && !TC.loading && "bg-primary text-primary-foreground"
                    )}
                >
                    <Search className="pointer-events-none mx-3" size={18} />
                </button>
                <Input
                    disabled={TC.loading}
                    {...register("search")}
                    type="text"
                    placeholder="Rechercher"
                    className="w-full rounded-l-none rounded-r-md border border-border"
                />
                {TC.query.search ? (
                    <button
                        disabled={TC.loading}
                        type="button"
                        className="absolute right-2 cursor-pointer"
                        onClick={handleRemoveSearch}
                    >
                        <X size={20} />
                    </button>
                ) : null}
            </form>
        </div>
    ) : null;
};
