import { queryGetByModule, queryGetByModuleAndId } from "@vape/actions/queries";
import { getPermissions } from "@vape/lib/permissions";
import { Resource } from "@vape/types/resources.type";
import FormModule from "../modules/Form.module";
import FormBuilder from "../modules/formBuilder/FormBuilder";
import TableModule from "../modules/table/Table.module";

export const ResolveModules = async ({
    rscData,
    page,
    id,
}: {
    rscData: Resource;
    page: "index" | "create" | "_id";
    id?: string;
}) => {
    const permissions = await getPermissions(rscData);

    if (rscData[page]?.modules) {
        let response = null;
        // @ts-ignore
        return rscData[page].modules.map(async (module, i) => {
            switch (module.type) {
                case "table":
                    response = await queryGetByModule({
                        model: module.model,
                        get: module.get,
                    });
                    if (response)
                        return (
                            <TableModule
                                key={i}
                                tableBuilder={module}
                                data={response.data}
                                permissions={permissions}
                            />
                        );
                    break;
                case "form":
                    response = await queryGetByModuleAndId({
                        model: module.model,
                        get: String(module.get),
                        id: String(id),
                    });
                    if (response)
                        return (
                            <FormModule key={i} formBuilder={module} data={response.data} id={id} />
                        );
                    break;
                case "make-form":
                    /*  model Form {
                        id          Int      @id @default(autoincrement())
                        userId      String
                        createdAt   DateTime @default(now())
                        published   Boolean  @default(false)
                        name        String
                        description String   @default("")
                        content     String   @db.Text
                      
                        visits      Int @default(0)
                        submissions Int @default(0)
                      
                        shareURL        String            @unique @default(uuid())
                        FormSubmissions FormSubmissions[]
                      
                        @@unique([name, userId])
                      } */
                    return (
                        <FormBuilder
                            key={i}
                            form={{
                                id: 1,
                                userId: "1",
                                createdAt: new Date(),
                                published: false,
                                name: "name",
                                description: "description",
                                content: "[]",
                                visits: 0,
                                submissions: 0,
                                shareURL: "shareURL",
                                FormSubmissions: [
                                    {
                                        id: 1,
                                        formId: 1,
                                        content: "",
                                    },
                                ],
                            }}
                        />
                    );
                    break;

                default:
                    return null;
            }
        });
    }
    return null;
};

const getDataModule = (module: any, data: any) => {};
