const fs = require("fs");

function main() {
    // replace public with your public folder
    console.log("Copying public folder");
    fs.cpSync("../assets", "./public/assets", { recursive: true });
}

main();
