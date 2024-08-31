/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "ecommerce-server-byjv.onrender.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
  
      { hostname: "localhost" },
      { hostname: "web-production-b912.up.railway.app" },
      { hostname: "ecommerce-server-byjv.onrender.com" },
    ],
  },
};

module.exports = nextConfig;
