import { VapeConfig } from "@vape/types/vapeConfg.type";
import packageJson from "../package.json";
import { roles } from "./constants";

const vapeConfig: VapeConfig = {
    version: packageJson.version,
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
};

export default vapeConfig;
