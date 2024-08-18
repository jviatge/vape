"use client";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
import { TransitionProvider } from "@vape/components/providers/TransitionProvider";
import { Card } from "@vape/components/ui/card";
import { Table } from "@vape/components/ui/table";
import useIsSSR from "@vape/hooks/useIsSSR";
import { Permissions } from "@vape/lib/permissions";
import { cn } from "@vape/tools";
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
    modeSelect?: "single" | "multiple";
    tableBuilder: TableBuilder;
    permissions?: Permissions;
    onChangeSelect?: (data: any) => void;
}

const TableModule: React.FC<TableModuleProps> = ({
    tableBuilder,
    permissions,
    modeSelect,
    onChangeSelect,
}) => {
    const isSSR = useIsSSR();
    const { getAll } = useParamsTable();

    return (
        !isSSR && (
            <TablesProvider
                modeSelect={modeSelect}
                value={{
                    tableBuilder: tableBuilder,
                    permissions: permissions,
                    defaultQuery: getAll(),
                }}
            >
                <ContentModuleTable onChangeSelect={onChangeSelect} />
            </TablesProvider>
        )
    );
};

const ContentModuleTable = ({ onChangeSelect }: { onChangeSelect?: (data: any) => void }) => {
    const TC = useContext(TableContext);

    useEffect(() => {
        onChangeSelect && TC.selectRowsDatas && onChangeSelect(TC.selectRowsDatas);
    }, [onChangeSelect, TC]);

    const dataGetAll = useQuery<any, Error, Data>({
        enabled: TC.mounted,
        queryKey: [TC.tableBuilder.model, TC.query],
        queryFn: () =>
            queryGetByModule({
                model: TC.tableBuilder.model,
                searchInputField: TC.tableBuilder.searchInputField,
                query: TC.query,
            }).then((res) => res.data),
    });

    useEffect(() => {
        TC.loading !== dataGetAll.isLoading && TC.setLoading(dataGetAll.isLoading);
    }, [TC, dataGetAll.isLoading, TC.setLoading]);

    return (
        <TransitionProvider>
            <Header
                query={{
                    getAll: dataGetAll,
                }}
                config={{
                    Refresh: {
                        disabled: false,
                    },
                }}
            />

            <Card className={cn("overflow-hidden relative", TC.modeTrash && "border-destructive")}>
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
        </TransitionProvider>
    );
};

export default TableModule;
