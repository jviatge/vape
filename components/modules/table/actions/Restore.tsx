"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { queryPutMulitpleByModule } from "@vape/actions/queries";
import { queryClient } from "@vape/tools";
import { AlertTriangleIcon } from "lucide-react";
import { ReactNode, useContext, useMemo, useState } from "react";
import TableContext from "../context/Table.context";
import { resolveIDs } from "../utils/ids";

export const RestoreAction = ({
    openDialog,
    closeDialog,
    data,
    children,
}: {
    openDialog?: boolean;
    closeDialog?: () => void;
    data: Record<string, any> | Record<string, any>[];
    children: ReactNode;
}) => {
    const TC = useContext(TableContext);
    const [openDial, setOpenDial] = useState(false);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        if (openDialog) {
            setOpenDial(true);
            closeDialog && closeDialog();
        }
    }, [openDialog]);

    const model = TC.tableBuilder.model;

    const ids: string[] = resolveIDs(data);

    const mutationDeleteMulitple = useMutation<any, Error, any, any>({
        mutationFn: (ids) =>
            queryPutMulitpleByModule({
                data: {},
                model: model,
                put: "restoreMany",
                ids,
            }).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [model] });
            TC.setSelectRowsDatas([]);
            close();
        },
    });

    const handleDelete = async () => {
        close();
        mutationDeleteMulitple.mutate(ids);
    };

    const close = () => {
        setOpenDial(false);
        setLoading(false);
        closeDialog && closeDialog();
    };

    return TC.permissions && TC.permissions.delete ? (
        <div className="mx-2">
            <div
                onClick={() => {
                    setOpenDial(true);
                }}
            >
                {children}
            </div>

            <AlertDialog open={openDial} onOpenChange={setOpenDial}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <AlertTriangleIcon size={24} className="text-red-500 mr-2" />
                            <span>
                                {ids.length > 1 ? "restaurer les éléments" : "restaurer l'élément"}
                            </span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-2">
                            {ids.length > 1
                                ? `Êtes-vous sûr de vouloir restaurer ces ${ids.length} éléments ?`
                                : "Êtes-vous sûr de vouloir restaurer cet élément ?"}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Restaurer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    ) : null;
};
