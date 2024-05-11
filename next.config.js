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
<<<<<<< HEAD
            hostname: "localhost"
        }]
=======
            hostname: "server.varimartbd.com"
        }, {hostname: "localhost"}]
>>>>>>> origin/production-version
    },
   
}

module.exports = nextConfig
