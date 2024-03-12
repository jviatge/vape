import { Input } from "@vape/components/ui/input";
import { cn } from "@vape/lib/utils";
import { Search, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TableContext from "../context/Table.context";
import useParamsTable from "../hook/useParamsTable";

type Inputs = {
    search: string;
};

export const SearchInput = () => {
    const TC = useContext(TableContext);
    const { set, get } = useParamsTable("search-input");
    const { register, handleSubmit, reset, setValue, watch } = useForm<Inputs>();

    const watchSearch = watch("search");

    useEffect(() => {
        setValue("search", get());
        return () => {};
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        set(data.search);
        TC.setSearchInput(data.search);
    };

    const handleRemoveSearch = () => {
        set("");
        TC.setSearchInput("");
        reset();
    };

    return TC.tableBuilder.searchInputField ? (
        <div className="flex flex-col">
            <form className="flex items-center relative" onSubmit={handleSubmit(onSubmit)}>
                <button
                    disabled={!watchSearch}
                    type="submit"
                    className={cn(
                        "h-10 flex items-center bg-primary-foreground rounded-l-md border-l border-y cursor-pointer",
                        watchSearch && "bg-primary text-primary-foreground"
                    )}
                >
                    <Search className="pointer-events-none mx-3" size={18} />
                </button>
                <Input
                    {...register("search")}
                    type="text"
                    placeholder="Rechercher"
                    className="w-full rounded-l-none rounded-r-md border border-border"
                />
                {TC.searchInput ? (
                    <X
                        size={20}
                        className="absolute right-2 cursor-pointer"
                        onClick={handleRemoveSearch}
                    />
                ) : null}
            </form>
        </div>
    ) : null;
};
