"use server";

import { getPermissions } from "@vape/lib/permissions";
import { resolveColumnsClass, resolveSpanClass } from "@vape/lib/resolveGrid";
import { Resource } from "@vape/types/resources";
import { Session } from "next-auth";

import { CustomModule } from "./modules/Custom.module";
import FormModule from "./modules/form/Form.module";
import FormMaker from "./modules/formBuilder/FormMaker";
import TableModule from "./modules/table/Table.module";

export const ResolveModules = async ({
    session,
    rscData,
    page,
    id,
}: {
    session: Session | void;
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
                let moduleCache: any;

                switch (module.type) {
                    case "custom":
                        moduleCache = (
                            <CustomModule
                                key={i}
                                authUser={session?.user}
                                {...{
                                    ...module,
                                }}
                            />
                        );
                        break;
                    case "table":
                        moduleCache = (
                            <TableModule key={i} tableBuilder={module} permissions={permissions} />
                        );
                        break;
                    case "form":
                        moduleCache = (
                            <FormModule
                                key={i}
                                formBuilder={module}
                                authUser={session?.user}
                                id={id}
                            />
                        );
                        break;
                    case "form-maker":
                        moduleCache = (
                            <FormMaker
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

                modules.push(
                    <div
                        key={i}
                        className={`flex flex-col relative ${resolveSpanClass(module?.span ?? 4)}`}
                    >
                        {moduleCache}
                    </div>
                );
            })
        );
    }
    return <div className={resolveColumnsClass(4, 5)}>{modules.map((module, i) => module)}</div>;
};
