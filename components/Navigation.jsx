import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { useRef, useLayoutEffect } from "react";

import { classNames } from "../helpers/classNames";
import { verticalLoop } from "../helpers/verticalLoop";
import { ActiveLink } from "./ActiveLink";

function handleClick(e) {
  const click = new Audio("/audio/click.mp3");
  click.play();
}

export function Navigation({ links, className }) {
  const nav = useRef();
  const wrapper = useRef();

  const navigation = [
    ...links,
    ...links,
    ...links,
    ...links,
    ...links,
    ...links,
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(Observer);

    const ctx = gsap.context(() => {
      const loop = verticalLoop("ul li", {
        repeat: -1,
        center: false,
      });

      loop.timeScale(0);

      Observer.create({
        target: window,
        type: "wheel,touch",
        lockAxis: true,
        scrollSpeed: -1,
        onChange: (self) => {
          gsap.to(loop, {
            timeScale: self.deltaY * 0.35,
            onComplete: () => {
              gsap.to(loop, {
                timeScale: 0,
                duration: 0.5,
                ease: "none",
              });
            },
          });
        },
      });
    }, nav);
    return () => ctx.revert();
  });

  return (
    <nav
      className={classNames(
        className,
        "relative z-[4000] row-start-1 h-full w-full translate-x-full overflow-hidden bg-light-grey text-mid-grey transition-transform lg:translate-x-0"
      )}
      ref={nav}
    >
      <ul className="relative flex flex-col tracking-tighter" ref={wrapper}>
        {navigation.map((item, index) => {
          return (
            <li
              // Using index as key as we duplicate data and the UID
              // becomes duplicated. This index can be replaced with
              // UID when I have more projects
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="block w-full text-8xl leading-none tracking-tighter lg:text-6xl"
            >
              <ActiveLink
                onClick={(e) => handleClick(e)}
                className="block cursor-pointer transition-colors hover:text-black"
                activeClassName="text-black pointer-events-none"
                href={`/${item.slug}`}
              >
                {item.name}
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
