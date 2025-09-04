/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://rawaheldawlia.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/dashboard/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api"],
      },
    ],
    additionalSitemaps: ["https://rawaheldawlia.com/sitemap.xml"],
  },
  alternateRefs: [
    {
      href: "https://rawaheldawlia.com/ar",
      hreflang: "ar",
    },
    {
      href: "https://rawaheldawlia.com/en",
      hreflang: "en",
    },
  ],
};

module.exports = config;
