import packageJson from "../../package.json";

async function get(req: any, data: any) {
    return {
        version: packageJson.version,
    };
}

export default get;
