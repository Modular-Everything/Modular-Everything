import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";

import { verticalLoop } from "../helpers/verticalLoop";

const navItems = [
  { title: "Nalgene", link: "/", id: 1 },
  { title: "Montbell", link: "/", id: 2 },
  { title: "Arc'teryx", link: "/", id: 3 },
  { title: "Snow Peak", link: "/", id: 4 },
  { title: "Aquapac", link: "/", id: 5 },
  { title: "Colorful Standard", link: "/", id: 6 },
];

const navigation = [
  ...navItems,
  ...navItems,
  ...navItems,
  ...navItems,
  ...navItems,
  ...navItems,
];

export function Navigation() {
  const nav = useRef();
  const wrapper = useRef();

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
        wheelSpeed: 0.25,
        onChange: (self) => {
          gsap.to(loop, {
            timeScale: self.deltaY,
            ease: "none",
          });
        },
        onStop: () => {
          gsap.to(loop, {
            timeScale: 0,
            ease: "none",
          });
        },
      });
    }, nav);
    return () => ctx.revert();
  });

  return (
    <nav className="col-span-3 bg-light-grey text-mid-grey" ref={nav}>
      <ul className="relative flex flex-col tracking-tighter" ref={wrapper}>
        {navigation.map((item, index) => (
          <li
            key={index}
            className={`block w-full text-4xl leading-none tracking-tighter ${
              index === 5 && "text-black"
            }`}
          >
            <Link
              href={item.link}
              className="block transition-colors hover:text-black"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
