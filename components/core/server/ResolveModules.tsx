"use server";

import { queryGetByModuleAndId } from "@vape/actions/queries";
import { getPermissions } from "@vape/lib/permissions";
import { Resource } from "@vape/types/resources.type";
import { CustomModule } from "../modules/Custom.module";
import FormModule from "../modules/form/Form.module";
import FormBuilder from "../modules/formBuilder/FormBuilder";
import TableModule from "../modules/table/Table.module";

export const ResolveModules = async ({
    rscData,
    page,
    id,
}: {
    rscData: Resource & { id: string };
    page: "index" | "create" | "_id";
    id?: string;
}) => {
    const permissions = await getPermissions(rscData);
    const modules: React.JSX.Element[] = [];

    if (rscData[page] && rscData[page]?.modules) {
        let response = null;

        await Promise.all(
            // @ts-ignore
            rscData[page].modules.map(async (module, i) => {
                switch (module.type) {
                    case "custom":
                        modules.push(
                            <CustomModule
                                key={i}
                                {...{
                                    ...module,
                                    /* ...{ component: "../../../../modules/" + module.component }, */
                                    /* ...{ component: "@modules/" + module.component }, */
                                }}
                            />
                        );
                        break;
                    case "table":
                        modules.push(
                            <TableModule key={i} tableBuilder={module} permissions={permissions} />
                        );
                        break;
                    case "form":
                        response = await queryGetByModuleAndId({
                            model: module.model,
                            get: String(module.get),
                            id: String(id),
                        });
                        if (response)
                            modules.push(
                                <FormModule
                                    key={i}
                                    formBuilder={module}
                                    data={response.data}
                                    id={id}
                                    rscId={rscData.id}
                                />
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
                        modules.push(
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
                }
            })
        );
    }
    return modules.map((module, i) => <>{module}</>);
};

const getDataModule = (module: any, data: any) => {};
