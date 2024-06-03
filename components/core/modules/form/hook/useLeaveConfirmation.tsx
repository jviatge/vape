import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@vape/components/ui/alert-dialog";
import { useCallback, useState } from "react";
import useRouteChangeEvents from "./useRouteChangeEvents";

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const onBeforeRouteChange = useCallback(() => {
        if (shouldPreventRouteChange) {
            setShowConfirmationDialog(true);
            return false;
        }

        return true;
    }, [shouldPreventRouteChange]);

    const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });

    return {
        confirmationDialog: (
            <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>⚠️ Alerte</AlertDialogTitle>
                        <AlertDialogDescription>
                            Des changements non sauvegardés ont été détectée dans le formulaire.
                            Souhaitez-vous réellement continuer ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={allowRouteChange}>Continner</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ),
    };
};

export default useLeaveConfirmation;
