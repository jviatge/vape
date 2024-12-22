/** @type {import('next').NextConfig} */
const path = require("path");
const dotenv = require("dotenv");
const withMDX = require("@next/mdx")();

dotenv.config({ path: path.join(__dirname, "/../.env") });

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // distDir: 'build',
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    images: {
        disableStaticImages: true,
    },
    transpilePackages: ["lucide-react"],
    pageExtensions: ["mdx", "ts", "tsx"],
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    experimental: {
        turbo: {},
    },
    async rewrites() {
        return [
            {
                source: "/public/app/logo.svg",
                destination: "/app/logo.svg",
            },
        ];
    },
};

module.exports = withMDX(nextConfig);
