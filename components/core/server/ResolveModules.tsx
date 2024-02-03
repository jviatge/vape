import { queryGetByModule, queryGetByModuleAndId } from "@vape/actions/queries";
import { Resource } from "@vape/types/resources.type";
import FormModule from "../modules/Form.module";
import TableModule from "../modules/Table.module";

export const ResolveModules = async ({
    rscData,
    page,
    id,
}: {
    rscData: Resource;
    page: "index" | "create" | "_id";
    id?: string;
}) => {
    if (rscData[page]?.modules) {
        let response = null;
        // @ts-ignore
        return rscData[page].modules.map(async (module) => {
            switch (module.type) {
                case "table":
                    response = await queryGetByModule({
                        model: module.model,
                        get: module.get,
                    });
                    if (response) return <TableModule tableBuilder={module} data={response.data} />;
                    break;
                case "form":
                    response = await queryGetByModuleAndId({
                        model: module.model,
                        get: String(module.get),
                        id: String(id),
                    });
                    if (response)
                        return <FormModule formBuilder={module} data={response.data} id={id} />;
                    break;

                default:
                    return null;
            }
        });
    }
    return null;
};

const getDataModule = (module: any, data: any) => {};
