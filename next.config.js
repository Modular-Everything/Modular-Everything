const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./helpers/imageLoader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storyblok.com",
        pathname: "/f/**",
      },
    ],
  },
};

module.exports = nextConfig;
