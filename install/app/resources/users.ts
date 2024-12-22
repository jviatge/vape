import { Resource } from "@vape/types/resources.type";
import vapeConfig from "~/configs/general";

export const fieldsFormUser = [
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

export const fieldsTableUser = [
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
        component: "columns/FirstNameNLastName",
        type: "custom",
    },
    {
        Label: "Email",
        name: "email",
        type: "string",
    },
    {
        Label: "Phone",
        name: "phone",
        type: "string",
    },
    {
        Label: "Active",
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
        order: 6,
        permissons: {
            read: ["super_admin", "admin"],
            create: ["super_admin", "admin"],
            update: ["super_admin", "admin"],
            delete: [],
            /* delete: ["super_admin"], */
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
            },
        ],
    },
    create: {
        modules: [
            {
                type: "form",
                model: "users",
                post: "createOne",
                fields: fieldsFormUser,
            },
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
            },
        ],
    },
};

export default user;
