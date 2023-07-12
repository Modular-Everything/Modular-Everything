import { useStoryblokState, getStoryblokApi } from "@storyblok/react";
import { gsap } from "gsap";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DragonDrop } from "../components/DragonDrop";
import { PageHead } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { Page } from "../components/Page";
import { ProjectsList } from "../components/ProjectsList";
import { Sidebar } from "../components/Sidebar";
import { setPageSize } from "../helpers/setPageSize";

export default function Home({ story, all_pages: { links } }) {
  const page = useStoryblokState(story);
  const nav = Object.values(links).filter(({ slug }) =>
    slug.startsWith("work/")
  );

  const router = useRouter();

  useEffect(() => {
    /**
     * Set the page height when the page loads or resizes
     * This is to fix the problem with 100vh not working on
     * certain mobile devices
     */
    setPageSize();
    window.addEventListener(
      "resize",
      debounce(() => setPageSize(), 150)
    );

    /**
     * Animate between pages
     */
    const target = ".transition-screen";
    const ease = "Expo.easeInOut";

    function aniStart() {
      gsap.to(target, {
        autoAlpha: 1,
        duration: 0.3,
        ease,
      });
    }

    function aniEnd() {
      gsap.fromTo(
        target,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 1,
          ease,
        }
      );
    }

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
      window.removeEventListener(
        "resize",
        debounce(() => setPageSize()),
        false
      );
    };
  }, [router, page.name]);

  /**
   * Deconstruct page and page content from our story
   */
  const { content } = page;
  const { page_name } = content;

  /**
   * Render the page/slug
   */

  return (
    <>
      <PageHead title={`${page_name || page.name} — Modular Everything`} />

      <div className="grid h-[--pageHeight] w-[--pageWidth] grid-cols-12">
        <Sidebar className="col-span-1 col-start-1 row-start-1" />

        <ProjectsList
          links={nav}
          className="col-span-11 col-start-2 lg:col-span-4"
        />

        <Navigation active="work" />

        {page.full_slug.startsWith("work/") ? (
          <div className="relative col-span-11 col-start-2 row-start-1 lg:col-start-6 lg:col-end-13">
            <div className="transition-screen pointer-events-none absolute left-0 top-0 z-[4000] h-full w-full bg-blue opacity-0" />

            <Page blok={page} />
          </div>
        ) : (
          <DragonDrop className="col-span-11 col-start-2 row-start-1 lg:col-span-7" />
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "draft", // or 'published'
  };

  const { data } = await storyblokApi.get("cdn/links/", sbParams);
  const paths = ["/"];

  Object.keys(data.links).forEach((linkKey) => {
    const { slug, is_folder } = data.links[linkKey];
    const splittedSlug = slug.split("/");

    if (!is_folder) {
      paths.push({ params: { slug: splittedSlug } });
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug ? params.slug.join("/") : "home";

  const sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  const { data: all_pages } = await storyblokApi.get("cdn/links", sbParams);

  return {
    props: {
      story: data ? data.story : false,
      all_pages: all_pages ?? false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
