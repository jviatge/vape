import { Button } from "@vape/components/ui/button";
import { Loading } from "@vape/components/ui/loading";
import { ArrowDownToLine } from "lucide-react";
import { useTransition } from "react";
import useDesigner from "./hooks/useDesigner";

function SaveFormBtn({ id }: { id: number }) {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        /* try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
            toast({
                title: "Success",
                description: "Your form has been saved",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } */
    };
    return (
        <Button
            variant={"outline"}
            className="gap-2"
            disabled={loading}
            onClick={() => {
                startTransition(updateFormContent);
            }}
        >
            <ArrowDownToLine className="h-4 w-4" />
            Save
            {loading && <Loading className="animate-spin h-4 w-4" />}
        </Button>
    );
}

export default SaveFormBtn;
