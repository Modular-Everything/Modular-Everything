import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

import { classNames } from "../helpers/classNames";

function Media({ src }) {
  const { filename, alt } = src;
  const ACCEPTED_EXTENSIONS = [".webm", ".mov", "mp4"];

  if (ACCEPTED_EXTENSIONS.some((ext) => filename.includes(ext))) {
    return (
      <video
        muted
        autoPlay
        loop
        width="100%"
        className="h-full w-full object-cover"
      >
        <source src={filename} type="video/webm" />
      </video>
    );
  }

  return <Image src={filename} alt={alt} fill className="object-cover" />;
}

export function Page({ blok, className }) {
  const { name, content } = blok;

  return (
    <div
      className={classNames(className, "grid h-[--pageHeight] grid-rows-12")}
      {...storyblokEditable(blok)}
    >
      {(content.type_of_work || content.stack) && (
        <div className="row-start-1 row-end-1 flex flex-col justify-end bg-dark-grey text-4xl text-white lg:text-lg">
          <p className="leading-none">
            {content.type_of_work && <span>{content.type_of_work}</span>}
            {content.type_of_work && content.stack && <span> &#8600; </span>}
            {content.stack && <span>{content.stack}</span>}
          </p>
        </div>
      )}

      <div className="row-start-2 row-end-6 grid grid-cols-7 lg:row-end-5">
        {content.description && (
          <div className="col-span-6 flex flex-col justify-end bg-black lg:col-span-3">
            <h1 className="invisible h-0 w-0">{name}</h1>
            <p className="text-4xl leading-none text-white lg:text-lg">
              {content.description}
            </p>
          </div>
        )}

        {content.url?.url && (
          <div className="col-span-1 flex flex-col justify-end text-4xl lg:text-lg">
            <a
              href={content.url.url}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-blue pt-6"
            >
              Visit&#8599;
            </a>
          </div>
        )}
      </div>

      <div className="relative row-start-6 row-end-13 lg:row-start-5 lg:row-end-13">
        {content.media?.filename && <Media src={content.media} />}
      </div>
    </div>
  );
}
