/** @type {import('next').NextConfig} */
const nextConfig = {
  // Updated to use stable turbopack config
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Enable bundle analyzer when ANALYZE=true
  ...(process.env.ANALYZE === "true" && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require("@next/bundle-analyzer")({
          enabled: true,
        });
        config.plugins.push(new BundleAnalyzerPlugin());
      }
      return config;
    },
  }),

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Security headers (disabled for static export)
  ...(process.env.STATIC_EXPORT !== "true" && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
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
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
      ];
    },
  }),

  // TypeScript configuration
  typescript: {
    // Skip type checking during build (handled by CI/CD)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Skip linting during build (handled by CI/CD)
    ignoreDuringBuilds: false,
  },

  // Output configuration for static export
  output:
    process.env.NODE_ENV === "production" &&
    process.env.STATIC_EXPORT === "true"
      ? "export"
      : "standalone",
  trailingSlash: false,

  // Static export configuration
  ...(process.env.STATIC_EXPORT === "true" && {
    images: {
      unoptimized: true,
    },
    // Remove assetPrefix for static export to avoid font loading issues
    trailingSlash: true,
  }),
};

module.exports = nextConfig;
