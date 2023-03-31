import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { useRef, useLayoutEffect } from "react";

import { verticalLoop } from "../helpers/verticalLoop";
import { ActiveLink } from "./ActiveLink";

function handleClick(e) {
  const click = new Audio("/audio/click.mp3");
  click.play();
}

export function Navigation({ links }) {
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
                duration: 1,
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
    <nav className="col-span-3 bg-light-grey text-mid-grey" ref={nav}>
      <ul className="relative flex flex-col tracking-tighter" ref={wrapper}>
        {navigation.map((item) => (
          <li
            key={item._uid}
            className="block w-full text-4xl leading-none tracking-tighter"
          >
            <ActiveLink
              href={`/${item.slug}`}
              scroll={false}
              onClick={(e) => handleClick(e)}
              className="block cursor-pointer transition-colors hover:text-black"
              activeClassName="text-black"
            >
              {item.name}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
