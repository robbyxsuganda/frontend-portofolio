import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker standalone output for VPS deployment
  output: "standalone",

  // Image optimization configuration
  images: {
    // Allow SVG images (needed for placehold.co placeholder images)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Backend server images (adjust domain when deployed)
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // Placeholder images (can be removed in production)
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // GitHub profile images (for fallback data)
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      // Add your production backend domain here
      // {
      //   protocol: "https",
      //   hostname: "api.robbysuganda.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    // Enable React Compiler (if using React 19)
    // reactCompiler: true,
  },

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Powered by header removal
  poweredByHeader: false,
};

export default nextConfig;
