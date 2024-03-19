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
            hostname: "178.16.139.2"
        }, {
          hostname: "localhost"
        }]
    },
   
}

module.exports = nextConfig
