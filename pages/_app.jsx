import "../styles/globals.css";
import { Space_Mono } from "@next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useRouter } from "next/router";

import { Page } from "../components/Page";

const components = {
  page: Page,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

// eslint-disable-next-line new-cap
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-mono",
});

function LaunchApp({ Component, pageProps }) {
  const router = useRouter();

  if (typeof window !== "undefined" && router.asPath.includes("_storyblok")) {
    document.querySelectorAll("a").forEach((link) => {
      link.removeAttribute("href");
    });
  }

  return (
    <main className={`${spaceMono.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

export default LaunchApp;
