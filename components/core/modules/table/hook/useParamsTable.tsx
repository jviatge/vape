import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useParamsTable = (key?: string) => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const set = (value: string) => {
        if (key) {
            const newParams = new URLSearchParams(params.toString());
            if (!value) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
            router.push(`${pathname}?${newParams.toString()}`);
        }
    };

    const get = (): string => {
        if (key && params.get(key)) {
            return params.get(key) as string;
        }
        return "";
    };

    const getAll = () => {
        return params.toString();
    };

    const clear = () => {
        if (key) {
            const newParams = new URLSearchParams(params.toString());
            newParams.delete(key);
            router.push(`${pathname}?${newParams.toString()}`);
        }
    };

    const clearAll = () => {
        router.push(pathname);
    };

    return {
        get,
        set,
        getAll,
        clear,
        clearAll,
    };
};

export default useParamsTable;
