"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryDeleteByModule, queryGetByModule } from "@vape/actions/queries";
import { Card } from "@vape/components/ui/card";
import { Table } from "@vape/components/ui/table";
import { Permissions } from "@vape/lib/permissions";
import { Data, TableBuilder } from "@vape/types/modules/table/table";
import React, { useContext, useEffect } from "react";
import PaginationTable from "./Pagination";
import TableContext from "./context/Table.context";
import TablesProvider from "./context/TableProvider";
import Header from "./header/Header";
import useParamsTable from "./hook/useParamsTable";
import { BodyTable } from "./partials/Body.table";
import { HeaderTable } from "./partials/Header.table";
import { LoadingTable } from "./partials/Loading.table";

interface TableModuleProps {
    tableBuilder: TableBuilder;
    permissions?: Permissions;
}

const TableModule: React.FC<TableModuleProps> = ({ tableBuilder, permissions }) => {
    const { getAll } = useParamsTable();

    return (
        <TablesProvider
            value={{
                tableBuilder: tableBuilder,
                permissions: permissions,
                defaultQuery: getAll(),
            }}
        >
            <ContentModuleTable />
        </TablesProvider>
    );
};

const ContentModuleTable: React.FC = () => {
    const TC = useContext(TableContext);

    const queryGetAll = useQuery<any, Error, Data>({
        queryKey: [TC.tableBuilder.model, TC.query],
        queryFn: () =>
            queryGetByModule({
                model: TC.tableBuilder.model,
                searchInputField: TC.tableBuilder.searchInputField,
                query: TC.query,
            }).then((res) => res.data.paginateData),
    });

    const mutationDeleteOne = useMutation<any, Error, any, any>({
        mutationFn: (id) =>
            queryDeleteByModule({
                model: TC.tableBuilder.model,
                remove: TC.tableBuilder.remove,
                id: String(id),
            }).then((res) => res.data),
    });

    useEffect(() => {
        TC.loading !== queryGetAll.isLoading && TC.setLoading(queryGetAll.isLoading);
        return () => {
            TC.setLoading(false);
        };
    }, [queryGetAll.isLoading]);

    return (
        <>
            <Header
                query={{
                    getAll: queryGetAll,
                }}
                config={{
                    Actions: {
                        disabled: false,
                    },
                    Refresh: {
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
