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
            hostname: "server.varimartbd.com"
        }, {hostname: "localhost"}, {hostname: "web-production-5dac.up.railway.app"}]
    },
   
}

module.exports = nextConfig
