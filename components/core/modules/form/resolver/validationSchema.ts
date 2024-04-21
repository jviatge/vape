import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isNotDecorateBuilder } from "../../lib/condition";
import { FieldBuilder } from "../RenderFields";

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

export const validationSchema = (fieldBuilder: FieldBuilder[]) => {
    return zodResolver(z.object(createZodObject(fieldBuilder)));
};

const createZodObject = (fieldBuilder: FieldBuilder[], entryZObject?: Record<string, any>) => {
    let zObject = entryZObject ?? {};

    fieldBuilder.map((field) => {
        if (field.type === "container" && field.fields) {
            zObject = createZodObject(field.fields, zObject);
        } else if (field.type === "sections" && field.tabs) {
            field.tabs.map((tab) => {
                zObject = createZodObject(tab.fields, zObject);
            });
        } else if (isNotDecorateBuilder(field)) {
            switch (field.type) {
                case "checkbox":
                case "switch":
                    zObject[field.name] = z.boolean();
                    break;

                case "oneToOne":
                    zObject[field.name] = field.fields
                        ? z.object({
                              ...createZodObject(field.fields),
                          })
                        : z.object({});
                    break;

                case "number":
                    zObject[field.name] = z.any().transform(Number).pipe(z.number());
                    break;

                case "date":
                    zObject[field.name] = z.date();
                    break;

                default:
                    zObject[field.name] = z.string();
                    break;
            }

            if (field.rules) {
                for (const [key, value] of Object.entries(field.rules)) {
                    zObject[field.name] = createZodRules(
                        zObject[field.name],
                        key as keyof RulesField,
                        value
                    );
                }
            }
        }
    });

    return zObject;
};

const createZodRules = (obj: any, key: keyof RulesField, rule: any) => {
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
