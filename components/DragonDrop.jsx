import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import debounce from "lodash/debounce";
import random from "lodash/random";
import { useRef, useEffect } from "react";

import { classNames } from "../helpers/classNames";
// import Click from "../public/audio/click.ogg";

/**
 * getRequiredTiles()
 * Calculate how many tiles can fit into the screen
 * @param {HTMLElement} wrapper The Element that wraps the tiles
 * @returns An object of columns and rows
 */
function getRequiredTiles(wrapper) {
  const size = 150;
  const { clientWidth, clientHeight } = wrapper;

  return {
    columns: Math.floor(clientWidth / size),
    rows: Math.floor(clientHeight / size),
  };
}

/**
 * tileStyle()
 * @returns A random colour and radius Tailwind class
 */
function tileStyle() {
  const colorBlue = "bg-blue";
  const colorBlack = "bg-blue";
  // const roundedNone = "rounded-none";

  const colors = [
    colorBlue,
    colorBlack,
    "bg-white",
    "bg-dark-grey",
    "bg-mid-grey",
  ];
  // const radius = [
  //   roundedNone,
  //   roundedNone,
  //   roundedNone,
  //   roundedNone,
  //   "rounded-full",
  //   "rounded-[2rem]",
  // ];
  return [
    colors[random(0, colors.length - 1)],
    // radius[random(0, radius.length - 1)],
  ];
}

/**
 * createTile()
 * Creates a tile Element
 * @param {number} index The index number from a loop
 * @returns An HTML Element
 */
function createTile(index) {
  const tile = document.createElement("div");
  tile.classList.add("tile", "draggable", "transition", ...tileStyle());
  tile.setAttribute("draggable", true);
  return tile;
}

/**
 * createTiles()
 * Creates tiles from a given quantity
 * @param {number} quantity How many tiles to create
 * @param {HTMLElement} wrapper The Element to place the tiles within
 */
function createTiles(quantity, wrapper) {
  Array.from({ length: quantity }).map((tile, index) => {
    return wrapper.append(createTile(index));
  });
}

/**
 *
 * @param {HTMLElement} wrapper The Element containing our tiles
 * @returns
 */
function createGrid(wrapper) {
  wrapper.innerHTML = "";

  const { columns, rows } = getRequiredTiles(wrapper);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  return createTiles(columns * rows, wrapper);
}

/**
 * handleResize()
 * @param {function} func A function to pass to the event listener
 */
function handleResize(func) {
  window.addEventListener("resize", func);
}

/**
 * createDraggable();
 * Creates draggable elements using GreenSock
 * @param {string} className The class of the draggable element
 * @param {HTMLElement} wrapper The wrapper of the draggables
 */
function createDraggable(className, wrapper) {
  const { clientWidth, clientHeight } = wrapper.querySelector(className);
  gsap.registerPlugin(Draggable);

  const pickup = new Audio("/audio/pickup.mp3");
  const drop = new Audio("/audio/drop.mp3");
  const move = new Audio("/audio/move.mp3");

  Draggable.create(className, {
    bounds: wrapper,
    type: "x,y",
    edgeResistance: 0.65,
    liveSnap: true,
    onPress: () => pickup.play(),
    onRelease: () => drop.play(),
    onDrag: () => move.play(),
    snap: {
      x(endValue) {
        return Math.round(endValue / clientWidth) * clientWidth;
      },
      y(endValue) {
        return Math.round(endValue / clientHeight) * clientHeight;
      },
    },
  });
}

/**
 * DragonDrop()
 * @param {string} className A string of classNames
 * @returns The React component
 */
export function DragonDrop({ className }) {
  const wrapper = useRef(null);

  useEffect(() => {
    const { current } = wrapper;

    // Create the grid layout
    createGrid(current);
    handleResize(debounce(() => createGrid(current), 150));

    // Draggable
    createDraggable(".draggable", current);
    handleResize(debounce(() => createDraggable(".draggable", current), 150));
  }, [wrapper]);

  return (
    <div
      ref={wrapper}
      className={classNames(
        className,
        "drop-zone grid h-screen w-full grid-cols-dragon-drop grid-rows-dragon-drop"
      )}
    />
  );
}
