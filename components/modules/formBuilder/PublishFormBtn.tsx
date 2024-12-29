/* import { PublishForm } from "@/actions/form"; */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@vape/components/ui/alert-dialog";
import { Button } from "@vape/components/ui/button";
import { Loading } from "@vape/components/ui/loading";
import { toast } from "@vape/components/ui/use-toast";
import { ArrowUpToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function PublishFormBtn({ id }: { id: number }) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            /* await PublishForm(id); */
            toast({
                title: "Success",
                description: "Your form is now available to the public",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <ArrowUpToLine className="h-4 w-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you will not be able to edit
                        this form. <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available to the public and you
                            will be able to collect submissions.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        Proceed {loading && <Loading className="animate-spin h-4 w-4" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PublishFormBtn;
