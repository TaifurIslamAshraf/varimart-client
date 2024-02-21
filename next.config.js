/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname: "localhost"
        },{
            hostname: "abdullah-ecommerce-server.onrender.com"
        }]
    }
}

module.exports = nextConfig
