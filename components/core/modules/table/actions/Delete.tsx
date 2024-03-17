import {
    AlertDialog,
    /* AlertDialogAction,
    AlertDialogCancel, */
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Delete = ({ open }: { open: boolean }) => {
    return (
        <AlertDialog open={open ? true : false}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <AlertDialogCancel
                        disabled={mutationDeleteOne.isPending}
                        onClick={() => setDeleteId(null)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={mutationDeleteOne.isPending}
                        onClick={async () => {
                            const responseDelte = await mutationDeleteOne.mutateAsync(deleteId);
                            setDeleteId(null);
                            if (responseDelte) {
                                toast({
                                    title: "Succès",
                                    description: "Ressource supprimée avec succès !",
                                });
                                queryGetAll.refetch();
                            } else {
                                toast({
                                    variant: "destructive",
                                    title: "Erreur",
                                    description: "Une erreur s'est produite!",
                                });
                            }
                        }}
                    >
                        Continue
                    </AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
