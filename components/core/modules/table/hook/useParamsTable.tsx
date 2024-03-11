import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useParamsTable = (key?: string) => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const set = (value: string, subKey?: string) => {
        if (key) {
            const newParams = new URLSearchParams(params.toString());
            if (!value) {
                if (subKey) {
                    newParams.delete(`${key}-${subKey}`);
                } else {
                    newParams.delete(key);
                }
            } else {
                if (subKey) {
                    newParams.set(`${key}-${subKey}`, value);
                } else {
                    newParams.set(key, value);
                }
            }
            router.push(`${pathname}?${newParams.toString()}`);
        }
    };

    const get = (subKey?: string): string => {
        if (key) {
            if (subKey) {
                return params.get(`${key}-${subKey}`) as string;
            }
            if (params.get(key)) return params.get(key) as string;
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
