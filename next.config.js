/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_HOST,
    },
}

module.exports = nextConfig
