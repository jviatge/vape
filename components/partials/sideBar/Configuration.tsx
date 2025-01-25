import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useLocalStorage from "@vape/hooks/useLocalStorage";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

export const Configuration = ({
    open,
    setOpen,
    versionApp,
    versionVape,
    listThemes,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    versionApp: string;
    versionVape: string;
    listThemes: string[];
}) => {
    const [config, setConfig] = useState<Record<string, any>>({});
    const [theme, setTheme] = useLocalStorage<string>("theme-color", "theme-default");

    const handleSubmit = () => {
        if (config?.theme) {
            setTheme(config.theme);
        }
        setOpen(false);
        window.location.reload();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Configuration</DialogTitle>
                    <DialogDescription>
                        <span>Version App : {versionApp}</span>
                        <br />
                        <span>Version Vape : {versionVape}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className={"grid grid-cols-4 gap-4"}>
                    <div className={"flex flex-col relative col-span-4"}>
                        {/*'text-muted-foreground/50'*/}
                        <Label
                            className={"mb-3 text-foreground/90 flex items-center"}
                            htmlFor="theme"
                        >
                            Thème
                        </Label>
                        <Select
                            defaultValue={theme}
                            onValueChange={(value: string) =>
                                setConfig((v) => ({ ...v, theme: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {listThemes.map((theme, index) => (
                                    <SelectItem key={theme + index} value={theme}>
                                        {theme}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* <div className={"flex flex-col relative col-span-2"}>
                        <Label
                            className={"mb-3 text-foreground/90 flex items-center"}
                            htmlFor="sizeRow"
                        >
                            Tableau: hauteur de ligne
                        </Label>
                        <Select
                        defaultValue={sizeRow}
                            onValueChange={(value: "normal" | "small") => setSizeRow(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="sizeRow" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"normal"}>Normale</SelectItem>
                                <SelectItem value={"small"}>Petite</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Fermer
                        </Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        disabled={Object.keys(config).length < 1}
                        onClick={handleSubmit}
                    >
                        Appliquer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
