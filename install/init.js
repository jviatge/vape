const fs = require("fs");

async function main() {
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

    // move .vape to nameProject
    console.log("=> Move .vape to project folder");
    await fs.renameSync("./../.vape", pathToProject + "/.vape");

    console.log("-- successfull --");
}

main();
