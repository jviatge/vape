const fs = require("fs");

async function main() {
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
