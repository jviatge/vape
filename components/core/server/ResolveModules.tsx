import { queryGetByModule } from "@vape/actions/resources";
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
        let data = null;
        // @ts-ignore
        return rscData[page].modules.map(async (module) => {
            switch (module.type) {
                case "table":
                    data = await queryGetByModule(module.model, module.get, id);
                    console.log(data);
                    return <TableModule tableBuilder={module} data={data} />;
                case "form":
                    data = await queryGetByModule(module.model, module.get, id);
                    console.log(data);
                    return <FormModule formBuilder={module} data={data} />;

                default:
                    return null;
            }
        });
    }
    return null;
};

const getDataModule = (module: any, data: any) => {};
