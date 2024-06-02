/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'salehriaz.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;