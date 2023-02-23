import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import debounce from "lodash/debounce";
import random from "lodash/random";
import { useRef, useEffect } from "react";

/**
 * getRequiredTiles()
 * Calculate how many 100x100 tiles can fit into the screen
 * @returns An object of columns and rows
 */
function getRequiredTiles() {
  const size = 256;
  return {
    columns: Math.floor(document.body.clientWidth / size),
    rows: Math.floor(document.body.clientHeight / size),
  };
}

/**
 * tileStyle()
 * @returns A random colour and radius Tailwind class
 */
function tileStyle() {
  const colors = [
    "bg-blue",
    "bg-white",
    "bg-pure-black",
    "bg-dark-grey",
    "bg-mid-grey",
  ];
  const radius = ["rounded-full", "rounded-none", "rounded-[2rem]"];
  return [
    colors[random(0, colors.length - 1)],
    radius[random(0, radius.length - 1)],
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
  tile.classList.add("tile", "draggable", ...tileStyle());
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

  const { columns, rows } = getRequiredTiles();

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
  Draggable.create(className, {
    bounds: wrapper,
    type: "x,y",
    edgeResistance: 0.65,
    liveSnap: true,
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
 * @returns The React component
 */
export function DragonDrop() {
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
      className="drop-zone grid h-screen w-screen grid-cols-dragon-drop grid-rows-dragon-drop"
    />
  );
}
