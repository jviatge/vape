import { FieldForm } from "@vape/types/modules/form";
import { FieldTable } from "@vape/types/modules/table";
import { FormModule, Resource, TableModule } from "@vape/types/resources";
import vapeConfig from "~/configs/general";

export const fieldsFormUser: FieldForm[] = [
    {
        label: "Role",
        name: "role",
        type: "select",
        options: vapeConfig.roles,
    },
    {
        label: "First name",
        name: "first_name",
        type: "text",
    },
    {
        label: "Last name",
        name: "last_name",
        type: "text",
    },
    {
        label: "Email",
        name: "email",
        type: "text",
    },
    {
        label: "Phone",
        name: "phone",
        type: "text",
    },
    {
        label: "Password",
        name: "password",
        type: "password",
    },
    {
        label: "Active",
        name: "active",
        type: "switch",
    },
];

export const fieldsTableUser: FieldTable[] = [
    {
        label: "Role",
        name: "role",
        type: "badge",
        options: vapeConfig.roles,
        filter: {
            type: "select",
            options: vapeConfig.roles,
        },
    },
    {
        label: "Name",
        name: "name",
        component: "columns/FirstNameNLastName",
        type: "custom",
    },
    {
        label: "Email",
        name: "email",
        type: "string",
    },
    {
        label: "Phone",
        name: "phone",
        type: "string",
    },
    {
        label: "Active",
        name: "active",
        type: "boolean",
    },
    {
        label: "Created at",
        name: "created_at",
        type: "date",
    },
];

const user: Resource = {
    params: {
        label: "Utilisateurs",
        icon: "user",
        separator: true,
        order: 6,
        permissons: {
            read: ["super_admin", "admin"],
            create: ["super_admin", "admin"],
            update: ["super_admin", "admin"],
            delete: [],
        },
    },
    index: {
        modules: [
            {
                remove: "deleteOne",
                type: "table",
                model: "users",
                get: "findMany",
                actions: [],
                fields: fieldsTableUser,
            } satisfies TableModule,
        ],
    },
    create: {
        modules: [
            {
                type: "form",
                model: "users",
                post: "createOne",
                fields: fieldsFormUser,
            } satisfies FormModule,
        ],
    },
    _id: {
        modules: [
            {
                type: "form",
                model: "users",
                get: "findOne",
                put: "updateOne",
                fields: fieldsFormUser,
            } satisfies FormModule,
        ],
    },
};

export default user;
