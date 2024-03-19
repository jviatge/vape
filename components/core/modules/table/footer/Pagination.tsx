import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@vape/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState } from "react";
import TableContext, { TableContext as TypeTableContext } from "../context/Table.context";

export const PaginationTable = ({ query }: { query: { getAll: UseQueryResult<any, Error> } }) => {
    return query.getAll.data ? <ContentPagination query={query} /> : null;
};

const ContentPagination = ({ query }: { query: { getAll: UseQueryResult<any, Error> } }) => {
    const TC = useContext(TableContext);
    const { data } = query.getAll;

    const [pageState, setPageState] = useState<number>(
        TC.query.page && TC.query.page.number ? Number(TC.query.page.number) : 1
    );

    return data.totalPage ? (
        <div className="flex items-center justify-between md:justify-end space-x-2 py-4 w-full">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                    const pageGo = pageState - 1;
                    TC.setQueryValue("page", "add", "number", pageGo.toString());
                    setPageState(pageGo);
                }}
                disabled={pageState === 1 || !TC.query.page}
            >
                <ChevronLeft className={"mr-3 h-4 w-4"} />
                <span>Précédent</span>
            </Button>

            <Paginator
                totalPages={data.totalPage}
                setPageState={setPageState}
                pageState={pageState}
                TC={TC}
            />

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                    const pageGo = pageState + 1;
                    TC.setQueryValue("page", "add", "number", pageGo.toString());
                    setPageState(pageGo);
                }}
                disabled={pageState >= data.totalPage}
            >
                <span>Suivant</span>
                <ChevronRight className={"ml-3 h-4 w-4"} />
            </Button>
        </div>
    ) : null;
};

const Paginator = ({
    totalPages,
    setPageState,
    pageState,
    TC,
}: /* TC, */
{
    totalPages: number;
    setPageState: (i: number) => void;
    pageState: number;
    TC: TypeTableContext;
}) => {
    const pagination = [];
    const createLink = (i: number, setPageState: any, pageState: number) => {
        return (
            <Button
                type="button"
                key={i}
                /* disabled={pageState === i} */
                variant={pageState === i ? "outline" : "ghost"}
                size="sm"
                onClick={async () => {
                    TC.setQueryValue("page", "add", "number", i.toString());
                    setPageState(i);
                }}
            >
                {i}
            </Button>
        );
    };

    const createDots = () => (
        <div key={"dot"} className="page">
            ...
        </div>
    );

    // If there are no pages return a message
    if (!totalPages) return <div>No pages</div>;

    // If totalPages is less than seven, iterate
    // over that number and return the page links
    if (totalPages < 7) {
        for (let i = 1; i <= totalPages; i++) {
            pagination.push(createLink(i, setPageState, pageState));
        }
        return pagination;
    }

    // Otherwise create the first three page links
    for (let i = 1; i <= 3; i++) {
        pagination.push(createLink(i, setPageState, pageState));
    }

    // Create the dots
    pagination.push(createDots());

    // Last three page links
    for (let i = totalPages - 2; i <= totalPages; i++) {
        pagination.push(createLink(i, setPageState, pageState));
    }

    return pagination;
};
