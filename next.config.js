const nextConfig = {
  images: {
    domains: ["a.storyblok.com"],
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
