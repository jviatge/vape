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

function main() {
    // replace public with your public folder
    console.log(logo);
    console.log("Copying public folder");
    fs.cpSync("../assets", "./public/assets", { recursive: true });
}

main();
