import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/tools/merge-pdf",
        destination: "/tools/pdf-merge",
        permanent: true,
      },
      {
        source: "/tools/split-pdf",
        destination: "/tools/pdf-split",
        permanent: true,
      },
      {
        source: "/tools/compress-pdf",
        destination: "/tools/pdf-compress",
        permanent: true,
      },
      {
        source: "/tools/jpg-to-pdf",
        destination: "/tools/image-to-pdf",
        permanent: true,
      },
      {
        source: "/tools/watermark-pdf",
        destination: "/tools/pdf-watermark",
        permanent: true,
      },
      {
        source: "/tools/tax-calculator",
        destination: "/tools/salary-tax-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
