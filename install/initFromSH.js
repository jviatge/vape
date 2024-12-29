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

async function main() {
    console.log(logo);
    console.log("+ Install Vape project +");
    const nameProject = process.argv[2] ?? "my-project";
    const pathToProject = "./" + nameProject;
    const pathAppInstall = ".vape/install/app";

    // mkdir nameProject
    console.log("=> Create project folder");
    await fs.mkdirSync(pathToProject);

    // move all in app to nameProject
    console.log("=> Move all in app to project folder");
    await fs.cpSync(pathAppInstall, pathToProject, { recursive: true });

    // cp .env.example to nameProject
    console.log("=> Create .env file (app)");
    await fs.copyFileSync(pathAppInstall + "/.env.example", pathToProject + "/.env");

    // cp .env.example to nameProject
    console.log("=> Create .env file (db)");
    await fs.copyFileSync(
        pathAppInstall + "/database/.env.example",
        pathToProject + "/database/.env"
    );

    // rename vape to .vape
    // console.log("=> Rename .vape folder");
    // await fs.renameSync("./../vape", "./../.vape");

    // move .vape to nameProject
    console.log("=> Move .vape to project folder");
    await fs.renameSync("./.vape", pathToProject + "/.vape");

    console.log("-- successfull --");
}

main();
