import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBuilder } from "../Form.module";

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

export const validationSchema = (formBuilder: FormBuilder) => {
    let zObjectRules: Record<string, any> = {};

    formBuilder.fields.map((field) => {
        zObjectRules[field.name] = z.string();
        if (field.rules) {
            for (const [key, value] of Object.entries(field.rules)) {
                zObjectRules[field.name] = createZodObject(
                    zObjectRules[field.name],
                    key as keyof RulesField,
                    value
                );
            }
        }
    });

    return zodResolver(z.object(zObjectRules));
};

const createZodObject = (obj: any, key: keyof RulesField, rule: any) => {
    switch (key) {
        case "required":
            return obj.min(1, "Ce champ est requis");
        case "minLength":
            return obj.min(rule, `Le nom doit contenir au moins ${rule} caractères`);
        case "maxLength":
            return obj.max(rule, `Le nom doit contenir au maximum ${rule} caractères`);
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
