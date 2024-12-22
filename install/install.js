const fs = require("fs");

async function main() {
    console.log("+ Install Vape +");
    const nameProject = "my-project";

    // mkdir nameProject
    console.log("=> Create project folder");
    await fs.mkdirSync("./../" + nameProject);

    // move all in app to nameProject
    console.log("=> Move all in app to project folder");
    await fs.renameSync("./install/app", "./../" + nameProject);

    // rename vape to .vape
    console.log("=> Rename .vape folder");
    await fs.renameSync("./../vape", "./../.vape");

    // move .vape to nameProject
    console.log("=> Move .vape to project folder");
    await fs.renameSync("./../.vape", "./../" + nameProject + "/.vape");
}

main();
