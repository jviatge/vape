import { color } from "@vape/lib/color";
import Generator from "./generator";
const nameRsc = process.argv[2] ?? "myResource";
const basePathsTemplate = "./cmd/generateTemplate/templates/";
const basePathProject = process.cwd().replace(".vape", "");

function capitalize(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const stringReplacers = [
    {
        value: nameRsc,
        target: "__rsc__",
    },
    {
        value: capitalize(nameRsc),
        target: "__rsc(capitalize)__",
    },
];

const templates = new Generator([
    {
        stringReplacers,
        templatePath: basePathsTemplate + "__rsc__.model.ts.template",
        outPath: basePathProject + "models",
    },
    {
        stringReplacers,
        templatePath: basePathsTemplate + "__rsc__.ts.template",
        outPath: basePathProject + "resources",
    },
]);

console.log("Generating model and resource...");
templates.generate();
console.log("Updating prisma...");
Generator.updateFile(
    basePathProject + "database/prisma/schema.prisma",
    `

model ${capitalize(nameRsc)} {
  id            String    @id @default(cuid())
  // Fields here
  // Soft delete
  deleted Boolean @default(false)
}`
);

const message = `
${color.green(`Resource ${nameRsc} generated successfully!`)}

Files added:
- ${color.blue(`./models/${nameRsc}.model.ts`)}
- ${color.blue(`./resources/${nameRsc}.ts`)}

File updated:
- ${color.blue(`./database/prisma/schema.prisma`)}

==============================================

Next steps:

1 - Add the fields to the schema.prisma.

> ${color.blue(`./database/prisma/schema.prisma`)}

2 - run the migrations with the following command:

$ ${color.magenta(`pnpm migrate`)}

3 - Add the fields to the resource file.

> ${color.blue(`./resources/${nameRsc}.ts`)}
`;

console.log(message);
