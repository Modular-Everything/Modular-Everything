import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { PageHead } from "../components/layout/Head";

export default function Page({ story }) {
  const page = useStoryblokState(story);
  return (
    <>
      <PageHead />
      <StoryblokComponent blok={page.content} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug ? params.slug.join("/") : "home";

  const sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "draft", // or 'published'
  };

  const { data } = await storyblokApi.get("cdn/links/", sbParams);
  const paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }
    const { slug } = data.links[linkKey];
    const splittedSlug = slug.split("/");
    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths,
    fallback: false,
  };
}
