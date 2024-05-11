/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
            ],
          },
        ];
      },
    images:{
        remotePatterns:[{
            hostname: "localhost"
        }]
    },
   
}

module.exports = nextConfig
