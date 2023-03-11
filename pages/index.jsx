import { useStoryblokState, getStoryblokApi } from "@storyblok/react";

import { PageHead } from "../components//Head";
import { Navigation } from "../components//Navigation";
import { DragonDrop } from "../components/DragonDrop";

export default function Home({ story }) {
  const page = useStoryblokState(story);

  return (
    <>
      <PageHead />
      <div className="grid w-screen grid-cols-9">
        <Navigation />
        <DragonDrop className="col-span-6" />
      </div>
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
