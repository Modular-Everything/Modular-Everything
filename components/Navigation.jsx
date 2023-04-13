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
      className={classNames(className, "h-screen bg-light-grey text-mid-grey")}
      ref={nav}
    >
      <ul className="relative flex flex-col tracking-tighter" ref={wrapper}>
        {navigation.map((item) => (
          <li
            key={item._uid}
            className="block w-full text-6xl leading-none tracking-tighter"
          >
            <ActiveLink
              onClick={(e) => handleClick(e)}
              className="block cursor-pointer transition-colors hover:text-black"
              activeClassName="text-black border-b-8 border-blue inline-block pointer-events-none"
              href={`/${item.slug}`}
            >
              {item.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
