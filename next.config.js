const nextConfig = {
  domains: ["a.storyblok.com"],
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
