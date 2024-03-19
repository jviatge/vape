"use client";

/* import { TestAction } from "@actions/Test";
import { TestModule } from "@modules/Test"; */
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryDeleteByModule, queryGetByModule } from "@vape/actions/queries";
import { Card } from "@vape/components/ui/card";
import { Table } from "@vape/components/ui/table";
import useIsSSR from "@vape/hooks/useIsSSR";
import { Permissions } from "@vape/lib/permissions";
import { Data, TableBuilder } from "@vape/types/modules/table/table";
import React, { useContext, useEffect } from "react";
import TableContext from "./context/Table.context";
import TablesProvider from "./context/TableProvider";
import { PaginationTable } from "./footer/Pagination";
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
    const isSSR = useIsSSR();
    const { getAll } = useParamsTable();

    return (
        !isSSR && (
            <TablesProvider
                value={{
                    tableBuilder: tableBuilder,
                    permissions: permissions,
                    defaultQuery: getAll(),
                }}
            >
                <ContentModuleTable />
            </TablesProvider>
        )
    );
};

const ContentModuleTable: React.FC = () => {
    const TC = useContext(TableContext);

    const dataGetAll = useQuery<any, Error, Data>({
        queryKey: [TC.tableBuilder.model, TC.query],
        queryFn: () =>
            queryGetByModule({
                model: TC.tableBuilder.model,
                searchInputField: TC.tableBuilder.searchInputField,
                query: TC.query,
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

    useEffect(() => {
        TC.loading !== dataGetAll.isLoading && TC.setLoading(dataGetAll.isLoading);
    }, [TC, dataGetAll.isLoading, TC.setLoading]);

    return (
        <>
            {/*  <TestAction />
            <TestModule /> */}
            <Header
                query={{
                    getAll: dataGetAll,
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
                        getAll: dataGetAll,
                    }}
                />
                <Table>
                    <HeaderTable
                        query={{
                            getAll: dataGetAll,
                        }}
                    />
                    <BodyTable query={{ getAll: dataGetAll }} />
                </Table>
            </Card>

            <PaginationTable
                query={{
                    getAll: dataGetAll,
                }}
            />
        </>
    );
};

export default TableModule;
