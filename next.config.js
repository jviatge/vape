/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");
const withMDX = require("@next/mdx")();

dotenv.config({ path: path.join(__dirname, "/../.env") });

const nextConfig = {
    // distDir: 'build',
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    swcMinify: true,
    transpilePackages: ["lucide-react"],
    pageExtensions: ["mdx", "ts", "tsx"],
};

module.exports = withMDX(nextConfig);
