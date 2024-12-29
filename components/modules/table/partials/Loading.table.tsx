import { UseQueryResult } from "@tanstack/react-query";
import { Loading } from "@vape/components/ui/loading";

export const LoadingTable = ({ query }: { query: { getAll: UseQueryResult<any, Error> } }) => {
    return query.getAll.isFetching && query.getAll.data ? (
        <div className="absolute top-0 left-0 w-full h-full bg-card opacity-50 flex justify-center pt-20 z-50">
            <Loading />
        </div>
    ) : null;
};
