import { VapeConfig } from "@vape/types/configs";
import { roles } from "./constants";

const vapeConfig: VapeConfig = {
    title: "Manage app",
    /* From directory assets */
    logo: "logo.svg",
    /* From directory assets */
    bgLogin: "bg-login.jpg",
    auth: {
        model: "users",
        get: "findByID",
        uniqueField: "email",
    },
    roles,
    translations: {
        default: "en",
        // available: ["en", "fr"],
    },
};

export default vapeConfig;
