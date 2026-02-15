import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  experimental: {
    mdxRs: true,
    // ppr: true,
    // serverActions: true, // Not compatible with static export
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.julescheron.com",
        port: "",       // leave empty
        pathname: "/**", // allow all paths
      },
    ],
  },
}

export default nextConfig
