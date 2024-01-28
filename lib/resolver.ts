import { getModel } from "@vape/actions/resources";
import { Resource } from "@vape/types/resources.type";

export const dataByPage = async (
    rscData: Resource,
    page: "index" | "create" | "_id",
    id?: number
) => {
    let data: Record<string, any> = [];

    if (rscData[page]?.modules) {
        await Promise.all(
            // @ts-ignore
            rscData[page].modules.map(async (module, index) => {
                if (module.get) {
                    const model = await getModel(module.model);
                    data[`${String(index)}_${module.type}`] = await model[module.get](id);
                }
            })
        );
    }

    return data;
};
