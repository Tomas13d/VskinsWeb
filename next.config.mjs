/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/productos/power-serum',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
