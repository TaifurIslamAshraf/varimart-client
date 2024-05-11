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
            hostname: "server.varimartbd.com"
        }, {hostname: "localhost"}]
=======
            hostname: "178.16.139.2"
        }]
>>>>>>> parent of dd4062c (make compateble with next-auth)
    },
   
}

module.exports = nextConfig
