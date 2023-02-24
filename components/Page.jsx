import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export function Page({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok?.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
