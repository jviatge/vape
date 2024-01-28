import { Resource } from "@vape/types/resources.type";
import FormModule from "./modules/Form.module";
import TableModule from "./modules/Table.module";

export const ResolveModules = ({
    rscData,
    data,
    page,
}: {
    rscData: Resource;
    data: any;
    page: "index" | "create" | "_id";
}) => {
    if (rscData[page]?.modules) {
        // @ts-ignore
        return rscData[page].modules.map((module, index: number) => {
            switch (module.type) {
                case "table":
                    return (
                        <TableModule
                            tableBuilder={module}
                            data={data[`${String(index)}_${module.type}`]}
                        />
                    );
                case "form":
                    return (
                        <FormModule
                            formBuilder={module}
                            data={data[`${String(index)}_${module.type}`]}
                        />
                    );

                default:
                    return null;
            }
        });
    }
    return null;
};
