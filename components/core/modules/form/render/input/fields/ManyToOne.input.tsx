import { Card } from "@vape/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { queryGetByModule } from "@vape/actions/queries";
import SelectBox from "@vape/components/ui/select-box";
import { resolveColumnsClass } from "@vape/lib/resolveGrid";
import { cn } from "@vape/lib/utils";
import { TableBuilder } from "@vape/types/modules/table/table";
import { Edit, Plus, Search, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { FormBuilder } from "../../../Form.module";
import FormGeneralContext from "../../../context/FormGeneral.context";
import { RenderFields } from "../../RenderFields";
import { BaseInput } from "../InputRender.type";

export interface ManyToOneInputProps extends BaseInput {
    type: "manyToOne";
    formBuilder: FormBuilder;
    tableBuilder: TableBuilder;
    form: UseFormReturn<any, any, undefined>;
    name: string;
    display?: "select" | "modal";
    disabled?: {
        create?: boolean;
        edit?: boolean;
        select?: boolean;
    };
}

export const ManyToOneInput = (props: ManyToOneInputProps) => {
    const form = useFormContext();

    const value = form.getValues(props.name);
    const valueParent = form.getValues();

    if (!props.display || props.display === "modal") {
        return <DisplayModal {...props} valueParent={valueParent} value={value} form={form} />;
    }
    return <DisplaySelect {...props} valueParent={valueParent} value={value} form={form} />;
};

const DisplayModal = ({
    formBuilder,
    tableBuilder,
    name,
    disabled,
    value,
    valueParent,
    form,
}: ManyToOneInputProps & {
    value: Record<string, any>;
    valueParent: Record<string, any>;
}) => {
    const { modal, setModal } = useContext(FormGeneralContext);

    const isNotObjectEmpty = (obj: Record<string, any>) => {
        return Object.keys(obj).length !== 0;
    };

    const classNameBtn =
        "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    useEffect(() => {
        if (modal.data && modal.name && modal.data[name]) {
            form.setValue(
                name,
                Array.isArray(modal.data[name]) ? modal.data[name][0] : modal.data[name],
                {
                    shouldDirty: true,
                }
            );
            setModal((v) => ({ ...v, data: {} }));
        }
    }, [modal.data, form, name]);

    return !isNotObjectEmpty(value) ? (
        <div className="flex justify-between items-center gap-4">
            {!disabled?.select ? (
                <button
                    onClick={() =>
                        setModal({
                            open: "select",
                            name: name,
                            tableBuilder: tableBuilder,
                        })
                    }
                    type="button"
                    className={cn(
                        "h-10 w-full flex justify-center items-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
                        classNameBtn
                    )}
                >
                    <Search size={20} />
                    <span className="ml-2">Sélectionner</span>
                </button>
            ) : null}

            {!disabled?.create ? (
                <button
                    onClick={() =>
                        setModal({
                            open: "create",
                            formBuilder,
                            valueParent,
                            name,
                        })
                    }
                    type="button"
                    className={cn(
                        "h-10 w-full flex justify-center items-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
                        classNameBtn
                    )}
                >
                    <Plus size={20} />
                    <span className="ml-2">Ajouter</span>
                </button>
            ) : null}
        </div>
    ) : (
        <Card className="p-3 space-y-4 relative overflow-hidden">
            <div className="absolute flex top-0 right-0 rounded-bl-md border-l border-b overflow-hidden z-40">
                {disabled?.edit ? null : (
                    <button
                        onClick={() => {
                            setModal({
                                name: name,
                                open: "edit",
                                formBuilder: formBuilder,
                                id: String(value.id),
                            });
                        }}
                        type="button"
                        className={cn(
                            "h-10 flex items-center bg-secondary text-secondary-foreground hover:bg-secondary/90",
                            classNameBtn
                        )}
                    >
                        <Edit className="pointer-events-none mx-3" size={18} />
                    </button>
                )}
                <button
                    onClick={() => form.setValue(name, {}, { shouldDirty: true })}
                    type="button"
                    className={cn(
                        "h-10 flex items-center bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        classNameBtn
                    )}
                >
                    <X className="pointer-events-none mx-3" size={18} />
                </button>
            </div>
            {formBuilder.fields && value ? (
                <div
                    className={cn(
                        resolveColumnsClass(formBuilder.col ?? 4, formBuilder.gap ?? 5),
                        formBuilder.className && formBuilder.className
                    )}
                >
                    <RenderFields fields={formBuilder.fields} data={value} onlyRead={true} />
                </div>
            ) : null}
        </Card>
    );
};

const DisplaySelect = ({
    form,
    name,
    tableBuilder,
}: ManyToOneInputProps & {
    value: Record<string, any>;
    valueParent: Record<string, any>;
}) => {
    const [select, setSelect] = useState<string | undefined>(form.getValues(name)?.id);
    const { data, isLoading } = useQuery<any, Error, any>({
        enabled: true,
        queryKey: [tableBuilder.model],
        queryFn: () =>
            queryGetByModule({
                model: tableBuilder.model,
                searchInputField: tableBuilder.searchInputField,
                query: {
                    get: tableBuilder.get,
                },
            }).then((res) => res.data),
    });

    const options = data?.map((d: any) => {
        return {
            value: d.id,
            label: tableBuilder.fields.map((f) => d[f.name]).join(" "),
        };
    });

    return options && !isLoading ? (
        <SelectBox
            options={options}
            value={select}
            onChange={(value) => {
                setSelect(value as string);
                form.setValue(
                    name,
                    data.find((v: any) => v.id === value),
                    {
                        shouldDirty: true,
                    }
                );
            }}
            placeholder={"Sélectionner..."}
            inputPlaceholder="Rechercher..."
            emptyPlaceholder="Aucun résultat trouvé."
        />
    ) : null;
};
