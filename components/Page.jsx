import Image from "next/image";
import Link from "next/link";

import { classNames } from "../helpers/classNames";

function Media({ src }) {
  const { filename, alt } = src;

  if (filename.includes(".webm")) {
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
    <div className={classNames(className, "grid h-screen grid-rows-12")}>
      {(content.type_of_work || content.stack) && (
        <div className="row-start-1 row-end-1 flex flex-col justify-end bg-dark-grey text-lg text-white">
          <p className="leading-none">
            {content.type_of_work && <span>{content.type_of_work}</span>}
            {content.type_of_work && content.stack && <span> &#8600; </span>}
            {content.stack && <span>{content.stack}</span>}
          </p>
        </div>
      )}

      <div className="row-start-2 row-end-5 grid grid-cols-6">
        {content.description && (
          <div className="col-span-2 flex flex-col justify-end bg-black">
            <h1 className="invisible h-0 w-0">{name}</h1>
            <p className="text-lg leading-none text-white">
              {content.description}
            </p>
          </div>
        )}

        {content.url?.url && (
          <div className="col-span-1 flex flex-col justify-end">
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

      <div className="relative row-start-5 row-end-12">
        {content.media?.filename && <Media src={content.media} />}
      </div>

      <div className="row-end-13 row-start-13 flex justify-end">
        <div className="flex">
          <Link
            href="/"
            className="flex flex-col justify-end whitespace-nowrap bg-dark-grey text-white"
          >
            Leave a comment
          </Link>

          <div className="flex w-72 items-end">
            <div className="w-full bg-blue">
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="object-fit h-5 w-5"
              >
                <path
                  d="M2.1 19H13.2V14.811H8.26667L6.7 15.2598L6.46667 14.624L7.76667 13.5768L17 3.25394L14.1 0L4.9 10.3602L3.96667 11.8189L3.4 11.5571L3.8 9.79921V4.18898H0V16.6437L2.1 19Z"
                  fill="#2B2B2B"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
