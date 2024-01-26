/** @type {import('next').NextConfig} */

const nextConfig = {
    // distDir: 'build',
    swcMinify: true,
    transpilePackages: ["lucide-react"],
};

module.exports = nextConfig;
