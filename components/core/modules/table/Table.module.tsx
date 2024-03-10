"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryDeleteByModule, queryGetByModule } from "@vape/actions/queries";
import { Card } from "@vape/components/ui/card";
import { Table } from "@vape/components/ui/table";
import { Permissions } from "@vape/lib/permissions";
import React, { useContext } from "react";
import PaginationTable from "./Pagination";
import TableContext from "./context/Table.context";
import TablesProvider from "./context/TableProvider";
import Header from "./header/Header";
import { BodyTable } from "./partials/Body.table";
import { HeaderTable } from "./partials/Header.table";
import { LoadingTable } from "./partials/Loading.table";

export type TableBuilder = {
    type: "table";
    model: string;
    remove: string;
    get: string | { label: string; get: string }[];
    fields: {
        label?: string;
        name: string;
        type: "string" | "date" | "boolean" | "hour" | "badge";
        format?: (value: any) => string;
    }[];
};

type Data = Record<string, any>[];

interface TableModuleProps {
    tableBuilder: TableBuilder;
    permissions?: Permissions;
}

const TableModule: React.FC<TableModuleProps> = ({ tableBuilder, permissions }) => {
    return (
        <TablesProvider
            value={{
                tableBuilder: tableBuilder,
                permissions: permissions,
            }}
        >
            <ContentModuleTable />
        </TablesProvider>
    );
};

const ContentModuleTable: React.FC = () => {
    const TC = useContext(TableContext);
    const queryGetAll = useQuery<any, Error, Data>({
        queryKey: [TC.tableBuilder.model, TC.get],
        queryFn: () =>
            queryGetByModule({
                model: TC.tableBuilder.model,
                get: TC.get,
                paginate: true,
            }).then((res) => res.data),
    });

    const mutationDeleteOne = useMutation<any, Error, any, any>({
        mutationFn: (id) =>
            queryDeleteByModule({
                model: TC.tableBuilder.model,
                remove: TC.tableBuilder.remove,
                id: String(id),
            }).then((res) => res.data),
    });

    return (
        <>
            <Header
                query={{
                    getAll: queryGetAll,
                }}
                config={{
                    SearchInput: {
                        disabled: false,
                    },
                    Actions: {
                        disabled: false,
                    },
                    Refresh: {
                        disabled: false,
                    },
                    Filter: {
                        disabled: false,
                    },
                }}
            />

            <Card className="overflow-hidden relative">
                <LoadingTable
                    query={{
                        getAll: queryGetAll,
                    }}
                />
                <Table>
                    <HeaderTable />
                    <BodyTable query={{ getAll: queryGetAll }} />
                </Table>
            </Card>

            <PaginationTable />
        </>
    );
};

export default TableModule;
