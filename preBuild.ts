const fs = require("fs");

function main() {
    // replace public with your public folder
    console.log("Copying public folder");
    fs.cpSync("../public", "./public", { recursive: true });
}

main();
