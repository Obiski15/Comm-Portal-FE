import type { NextConfig } from "next"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placeimg.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Next.js rewrite to proxy API requests to backend server.
        // Ensures consistent API base path and avoids cross-domain cookies issues by routing through the same origin.
        source: "/api/v1/:path*",
        destination: `${baseUrl}/api/v1/:path*`,
      },
      {
        // This will handle subdomain requests
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<subdomain>.*)\\.localhost",
          },
        ],
        destination: "/:subdomain/:path*",
      },
    ]
  },
}

export default nextConfig
