import { useStoryblokState, getStoryblokApi } from "@storyblok/react";

import { DragonDrop } from "../components/DragonDrop";
import { PageHead } from "../components/Head";
import { Navigation } from "../components/Navigation";
import { Sidebar } from "../components/Sidebar";

export default function Home({ story, all_pages: { links } }) {
  const page = useStoryblokState(story);
  const nav = Object.values(links).filter(({ slug }) =>
    slug.startsWith("work/")
  );

  console.log(page);

  return (
    <>
      <PageHead />

      <div className="grid h-screen w-screen grid-cols-12">
        <Sidebar className="col-span-1" />

        <Navigation links={nav} className="col-span-4" />

        {page.full_slug.startsWith("work/") ? (
          <div className="col-span-7">{page.name}</div>
        ) : (
          <DragonDrop className="col-span-7" />
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
    const { slug } = data.links[linkKey];
    const splittedSlug = slug.split("/");
    paths.push({ params: { slug: splittedSlug } });
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
