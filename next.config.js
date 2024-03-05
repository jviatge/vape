/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "/../.env") });

const nextConfig = {
    // distDir: 'build',
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    swcMinify: true,
    transpilePackages: ["lucide-react"],
};

module.exports = nextConfig;
