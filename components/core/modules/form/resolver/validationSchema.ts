import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@vape/types/modules/form/form";
import { z } from "zod";
import { isInputBuilder, isInputCustom } from "../../lib/condition";

export type RulesField = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: {
        value: RegExp;
        message: string;
    };
    isEmail?: boolean;
    postalCode?: boolean;
};

export const validationSchema = (fieldBuilder: Field[]) => {
    return zodResolver(z.object(createZodObject(fieldBuilder)));
};

const createZodObject = (fieldBuilder: Field[], entryZObject?: Record<string, any>) => {
    let zObject = entryZObject ?? {};

    fieldBuilder.map((field: Field) => {
        if (field.type === "container" && field.fields) {
            zObject = createZodObject(field.fields, zObject);
        } else if (field.type === "custom" && field.name && field.returnTypes) {
            zObject[field.name] = createZodType(field.returnTypes);
        } else if (field.type === "sections" && field.tabs) {
            field.tabs.map((tab) => {
                zObject = createZodObject(tab.fields, zObject);
            });
        } else if (isInputBuilder(field) || isInputCustom(field)) {
            const name: string = field.name as string;
            zObject[name] = createZodType(field.type);
            if (field.rules) {
                for (const [key, value] of Object.entries(field.rules)) {
                    if (field.type === "manyToOne") {
                        zObject[name] = zObject[name] = createZodRuleObject(
                            zObject[name],
                            key as keyof RulesField,
                            value
                        );
                    } else {
                        for (const [key, value] of Object.entries(field.rules)) {
                            zObject[name] = createZodRule(
                                zObject[name],
                                key as keyof RulesField,
                                value
                            );
                        }
                    }
                }
            }
        }
    });

    return zObject;
};

const createZodType = (type: Field["type"]) => {
    switch (type) {
        case "checkbox":
        case "switch":
            return z.boolean();
        case "manyToOne":
            return z.record(z.string(), z.any());
        case "number":
            return z.any().transform(Number).pipe(z.number());
        case "date":
            return z.coerce.date();
        default:
            return z.string();
    }
};

const createZodRuleObject = (obj: any, key: keyof RulesField, rule: any) => {
    switch (key) {
        case "required":
            return obj.refine((data: Record<string, string>) => Object.keys(data).length > 0, {
                message: "Ce champ est requis",
            });
        default:
            return obj;
    }
};

const createZodRule = (obj: any, key: keyof RulesField, rule: any) => {
    switch (key) {
        case "required":
            return obj.min(1, "Ce champ est requis");
        case "minLength":
            return obj.min(rule, `Le champ doit contenir au moins ${rule} caractères`);
        case "maxLength":
            return obj.max(rule, `Le champ doit contenir au maximum ${rule} caractères`);
        case "pattern":
            return obj.regex(rule.value, { message: rule.message });
        case "isEmail":
            return obj.email("Veuillez entrer un email valide");
        case "postalCode":
            return obj.regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "Code postal invalide");
        default:
            return obj;
    }
};
