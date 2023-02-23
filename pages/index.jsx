import { useStoryblokState, getStoryblokApi } from "@storyblok/react";

import { DragonDrop } from "../components/layout/DragonDrop";
import { PageHead } from "../components/layout/Head";

export default function Home({ story }) {
  const page = useStoryblokState(story);

  return (
    <>
      <PageHead />
      <div className="grid w-screen grid-cols-7">
        <nav className="col-span-2 bg-light-grey text-mid-grey">nav</nav>
        <DragonDrop className="col-span-5" />
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
