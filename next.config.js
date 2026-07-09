/*
 * script-src below is intentionally hash-pinned instead of 'unsafe-inline'.
 * The two hashes correspond to:
 *   1. The Plausible analytics init snippet (inline <script> in app/layout.tsx)
 *   2. The JSON-LD structured-data block (inline <script type="application/ld+json"> in app/layout.tsx)
 * Both are 100% static (no per-request/random content), so the hashes are stable across builds.
 * If either inline script's content ever changes, regenerate its hash with:
 *   node -e "console.log('sha256-' + require('crypto').createHash('sha256').update('<exact script text>').digest('base64'))"
 */
const PLAUSIBLE_INLINE_HASH = 'sha256-Ebt84R/xi8miDnxS/0/bkTjVgDRKQpWS1eI09TLbNkg=';
const JSON_LD_HASH = 'sha256-7BXSDU903QGCyGaNDKcVxF8AkIYDbN8yl2DmCX5UBAI=';

// Next.js's dev server (Fast Refresh/HMR) injects its own inline scripts and relies on
// eval() for source maps — neither is compatible with the hash-pinned production CSP below.
// So the strict policy only applies to production builds; dev mode gets a relaxed one.
const isProd = process.env.NODE_ENV === 'production';

const scriptSrc = isProd
  ? `script-src 'self' ${PLAUSIBLE_INLINE_HASH} ${JSON_LD_HASH} https://plausible.io`
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io";

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.jsdelivr.net https://cdn.simpleicons.org",
  "font-src 'self'",
  isProd
    ? "connect-src 'self' https://plausible.io https://github-contributions-api.jogruber.de"
    : "connect-src 'self' https://plausible.io https://github-contributions-api.jogruber.de ws:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
    // Both remote icon CDNs above only ever serve SVG skill/tech logos — safe to optimize.
    // Next.js blocks remote SVG optimization by default (XSS risk), so it's opted in here
    // with the sandboxed CSP Next's own docs recommend for the optimized image response itself.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
