import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // reactCompiler: true,
  compiler: {
    removeConsole: true,
  },
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
