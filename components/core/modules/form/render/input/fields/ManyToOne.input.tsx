import { Card } from "@vape/components/ui/card";
import { Input } from "@vape/components/ui/input";
import { cn } from "@vape/lib/utils";
import { TableBuilder } from "@vape/types/modules/table/table";
import { Edit, Plus, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { FormBuilder } from "../../../Form.module";
import FormGeneralContext from "../../../context/FormGeneral.context";
import { RenderViews } from "../../view/View.render";
import { BaseInput } from "../InputRender.type";

export interface ManyToOneInputProps extends BaseInput {
    type: "manyToOne";
    formBuilder: FormBuilder;
    tableBuilder: TableBuilder;
    form: UseFormReturn<any, any, undefined>;
    name: string;
    disabled?: {
        create?: boolean;
        edit?: boolean;
        select?: boolean;
    };
}

export const ManyToOneInput = ({
    formBuilder,
    tableBuilder,
    name,
    disabled,
}: ManyToOneInputProps) => {
    const { modal, setModal } = useContext(FormGeneralContext);

    const form = useFormContext();

    const isNotObjectEmpty = (obj: Record<string, any>) => {
        return Object.keys(obj).length !== 0;
    };

    const classNameBtn =
        "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    useEffect(() => {
        modal.data &&
            form.setValue(name, Array.isArray(modal.data) ? modal.data[0] : modal.data, {
                shouldDirty: true,
            });
    }, [modal.data, form, name]);
    const value = form.getValues(name);

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <Input
                    disabled={disabled?.select}
                    readOnly
                    value={
                        isNotObjectEmpty(value)
                            ? tableBuilder.fields
                                  .map((field) => {
                                      switch (field.type) {
                                          case "date":
                                              return new Date(
                                                  value[field.name]
                                              ).toLocaleDateString();
                                          default:
                                              return value[field.name];
                                      }
                                  })
                                  .join(" - ")
                            : ""
                    }
                    onClick={() =>
                        setModal({
                            open: "select",
                            tableBuilder: tableBuilder,
                        })
                    }
                    placeholder={"Sélectionner..."}
                    className="w-full my-3 rounded-r-none rounded-l-md border border-border cursor-pointer"
                />
                <button
                    onClick={() => {
                        !isNotObjectEmpty(value)
                            ? setModal({
                                  open: "create",
                                  formBuilder: formBuilder,
                              })
                            : form.setValue(name, {}, { shouldDirty: true });
                    }}
                    type="button"
                    className={cn(
                        "h-10 flex items-center rounded-r-md border-r border-y",
                        classNameBtn,
                        isNotObjectEmpty(value)
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {isNotObjectEmpty(value) ? (
                        <X className="pointer-events-none mx-3" size={18} />
                    ) : (
                        <Plus className="pointer-events-none mx-3" size={18} />
                    )}
                </button>
            </div>
            {isNotObjectEmpty(value) ? (
                <Card className="p-3 space-y-4 relative overflow-hidden">
                    <button
                        onClick={() => {
                            setModal({
                                open: "edit",
                                formBuilder: formBuilder,
                                id: String(value.id),
                            });
                        }}
                        type="button"
                        className={cn(
                            "h-10 flex absolute top-0 right-0 items-center rounded-bl-md border-l border-b bg-secondary text-secondary-foreground hover:bg-secondary/90",
                            classNameBtn
                        )}
                    >
                        <Edit className="pointer-events-none mx-3" size={18} />
                    </button>
                    {value &&
                        formBuilder.fields?.map((field, index) => {
                            return (
                                <RenderViews key={index} fieldBuilder={field as any} data={value} />
                            );
                        })}
                </Card>
            ) : null}
        </div>
    );
};
