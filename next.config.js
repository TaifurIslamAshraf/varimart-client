/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname: "localhost"
        },{
            hostname: "abdullah-ecommerce-server.onrender.com"
        }, {hostname: "ecommerce-server-5rzq.onrender.com"}]
    },
   
}

module.exports = nextConfig
