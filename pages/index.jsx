import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { PageHead } from "../components/layout/Head";

export default function Home({ story }) {
  const page = useStoryblokState(story);
  return (
    <>
      <PageHead />
      <StoryblokComponent blok={page.content} />
    </>
  );
}

export async function getStaticProps() {
  const slug = "home";

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
