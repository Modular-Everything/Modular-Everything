import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import Link from "next/link";
import { useRef, useLayoutEffect } from "react";

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
    gsap.registerPlugin(Draggable);

    const items = wrapper.current.querySelectorAll("li");
    const itemHeight = items[0].clientHeight;
    const itemsHeight = itemHeight * items.length;
    const itemsProgress = gsap.utils.wrap(0, 1);

    const ctx = gsap.context(() => {
      // Set the height of each item so they stack
      items.forEach((item, index) => {
        gsap.set(item, {
          y: index * itemHeight,
          top: -itemHeight,
        });
      });

      // Create animation... try unpausing it to see what's going on
      const animation = gsap
        .to("li", {
          duration: 1,
          y: `+=${itemsHeight}`, // the total height of the items
          paused: true,
          ease: "linear", // disable easing, it f's with this
          repeat: -1, // repeat infinitely
          modifiers: {
            y: (y) => {
              let pos = y;
              // Set the Y value to the value of the remainder after dividing the current Y position by the total number of items. This is what sets the item position and calculates whether its position should be shifted back to the top of the page. If the itemsHeight is 600 and the Y is 600, then the remainder is 0 so it gets moved back to the top. If the itemsHeight is 600 and the Y is 700, the remainder is 100 so the item is set to 100px
              pos = Number.parseFloat(y) % itemsHeight;
              return `${pos}px`;
            },
          },
        })
        .progress(1 / items.length);

      // Create a proxy to capture the dragging without
      // actually affecting the element. In other words,
      // we want to understand the users drag behaviour
      // without actually dragging the thing, because
      // we just use this drag data elsewhere
      const proxy = document.createElement("div");
      const props = gsap.getProperty(proxy);

      // Update progress
      function updateProgress() {
        animation.progress(itemsProgress(props("y") / itemsHeight));
      }

      // Set the proxy element to be draggable and send
      // the drag and throw data to updateProgress
      Draggable.create(proxy, {
        trigger: nav.current,
        throwProps: true,
        onDrag: updateProgress,
        onThrowUpdate: updateProgress,
        snap: {
          y: gsap.utils.snap(itemHeight),
        },
      });
    }, nav);

    return () => ctx.revert();
  });

  return (
    <nav className="col-span-3 bg-light-grey text-mid-grey" ref={nav}>
      <ul className="relative flex flex-col tracking-tighter" ref={wrapper}>
        {navigation.map((item, index) => (
          <li key={index} className="absolute block text-4xl leading-none">
            <Link
              href={item.link}
              className="transition-colors hover:text-black"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
