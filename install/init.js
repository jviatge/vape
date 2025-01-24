const fs = require("fs");

const logo = `
888     888                           
888     888                           
888     888                           
Y88b   d88P 8888b.  88888b.   .d88b.  
 Y88b d88P     "88b 888 "88b d8P  Y8b 
  Y88o88P  .d888888 888  888 88888888 
   Y888P   888  888 888 d88P Y8b.     
    Y8P    "Y888888 88888P"   "Y8888  
                    888               
                    888               
                    888              
`;

const renamePackageJSON = (path) => {
    // rename package.install.json to package.json (recursive)
    const files = fs.readdirSync(path);
    files.forEach((file) => {
        const pathFile = path + "/" + file;
        if (fs.lstatSync(pathFile).isDirectory()) {
            renamePackageJSON(pathFile);
        }
        if (file === "package.install.json") {
            fs.renameSync(pathFile, path + "/package.json");
        }
    });
};

async function main() {
    console.log(logo);
    console.log("+ Install Vape +");
    const nameProject = "my-project";
    const pathToProject = "./../" + nameProject;

    // mkdir nameProject
    console.log("=> Create project folder");
    await fs.mkdirSync(pathToProject);

    // move all in app to nameProject
    console.log("=> Move all in app to project folder");
    await fs.cpSync("./install/app", pathToProject, { recursive: true });

    // cp .env.example to nameProject
    console.log("=> Create .env file (app)");
    await fs.copyFileSync("./install/app/.env.example", pathToProject + "/.env");

    // cp .env.example to nameProject
    console.log("=> Create .env file (db)");
    await fs.copyFileSync("./install/app/database/.env.example", pathToProject + "/database/.env");

    // rename package.install.json to package.json (recursive)
    console.log("=> Rename package.install.json to package.json");
    renamePackageJSON(pathToProject);

    // move .vape to nameProject
    console.log("=> Move .vape to project folder");
    await fs.renameSync("./../.vape", pathToProject + "/.vape");

    console.log("-- successfull --");
}

main();
