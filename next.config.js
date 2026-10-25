/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Hosts allowed through the image optimizer (src/lib/image.ts decides
    // what actually gets optimized). CMS fields may contain any URL, so we
    // keep this list tight instead of opening an unrestricted image proxy.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [
      {
        // Anti-clickjacking + hardening for the admin surface.
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        // Uploaded images live in /public/uploads. The lock-down CSP makes any
        // script content inside admin-uploaded SVGs inert, even if someone
        // opens the SVG URL directly (inline styles stay allowed so SVG fills
        // keep rendering).
        source: "/uploads/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; style-src 'unsafe-inline'; sandbox",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
