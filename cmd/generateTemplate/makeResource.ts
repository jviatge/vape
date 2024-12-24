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

const model = new Generator([
    {
        stringReplacers,
        templatePath: basePathsTemplate + "__rsc__.model.ts.template",
        outPath: basePathProject + "models",
    },
]);
const resource = new Generator([
    {
        stringReplacers,
        templatePath: basePathsTemplate + "__rsc__.ts.template",
        outPath: basePathProject + "resources",
    },
]);

console.log("Generating model and resource...");

model.generate();
resource.generate();
