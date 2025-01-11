const color = {
    red: (str) => "\x1b[31m" + str + "\x1b[0m",
    green: (str) => "\x1b[32m" + str + "\x1b[0m",
    yellow: (str) => "\x1b[33m" + str + "\x1b[0m",
    blue: (str) => "\x1b[34m" + str + "\x1b[0m",
    magenta: (str) => "\x1b[35m" + str + "\x1b[0m",
    cyan: (str) => "\x1b[36m" + str + "\x1b[0m",
    white: (str) => "\x1b[37m" + str + "\x1b[0m",
    bgCyan: (str) => "\x1b[46m" + str + "\x1b[0m",
    reset: "\x1b[0m",
};

const fs = require("fs");

const logo = color.cyan(`
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
`);

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
    console.log("+ Install Vape project +");
    const nameProject = process.argv[2] ?? "my-project";
    const pathToProject = "./" + nameProject;
    const pathAppInstall = ".vape/install/app";

    // mkdir nameProject
    console.log("=> Create project folder");
    fs.mkdirSync(pathToProject);

    // move all in app to nameProject
    console.log("=> Move all in app to project folder");
    fs.cpSync(pathAppInstall, pathToProject, { recursive: true });

    // cp .env.example to nameProject
    console.log("=> Create .env file (app)");
    fs.copyFileSync(pathAppInstall + "/.env.example", pathToProject + "/.env");

    // cp .env.example to nameProject
    console.log("=> Create .env file (db)");
    fs.copyFileSync(pathAppInstall + "/database/.env.example", pathToProject + "/database/.env");

    // rename package.install.json to package.json (recursive)
    console.log("=> Init package.json");
    renamePackageJSON(pathToProject);

    // rename vape to .vape
    // console.log("=> Rename .vape folder");
    // fs.renameSync("./../vape", "./../.vape");

    // move .vape to nameProject
    console.log("=> Move .vape to project folder");
    fs.renameSync("./.vape", pathToProject + "/.vape");

    console.log("-- successfull --");
}

main();
