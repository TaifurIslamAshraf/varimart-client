/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname: "localhost"
        },{
            hostname: "abdullah-ecommerce-server.onrender.com"
        }]
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://144.126.157.233:8000/:path*' // Proxy to Backend
          }
        ]
      }
}

module.exports = nextConfig
