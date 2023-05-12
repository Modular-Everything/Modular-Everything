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
  tile.dataset.currentIndex = index;
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
  if (!wrapper) {
    return;
  }

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

  const drop = new Audio("/audio/drop.mp3");
  const move = new Audio("/audio/move.mp3");

  // const tile = document.querySelector(".tile");
  // const grid = document.querySelector(".tiles");
  // const rows = Number(getComputedStyle(grid).getPropertyValue("--rows"));
  // const cols = Number(getComputedStyle(grid).getPropertyValue("--columns"));

  function dragAction() {
    move.play();

    // const gridItems = [...grid.childNodes];
    // const indexInGrid = gridItems.indexOf(e.target);
    // const { currentIndex } = this.target.dataset;

    // console.log(indexInGrid, currentIndex);
    // const index = 0;

    // console.log(this);

    // const tileSize = {
    //   width: this.target.clientWidth,
    //   height: this.target.clientHeight,
    // };

    // console.log(tileSize);

    // function getIndex(direction, size, total) {
    //   return gsap.utils.clamp(Math.round(direction / size), 0, total - 1);
    // }

    // switch (this.getDirection()) {
    //   case "up": {
    //     console.log(Math.round(this.y / tileSize.height));
    //     break;
    //   }
    //   case "down": {
    //     console.log(Math.round(this.y / tileSize.height));
    //     console.log("going down");
    //     break;
    //   }
    //   case "left": {
    //     console.log(Math.round(this.y / tileSize.height));
    //     console.log("going left");
    //     break;
    //   }
    //   case "right": {
    //     console.log(Math.round(this.y / tileSize.height));
    //     console.log("going right");
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
  }

  return Draggable.create(className, {
    bounds: wrapper,
    type: "x,y",
    edgeResistance: 0.65,
    liveSnap: true,
    onRelease: () => drop.play(),
    onDrag: dragAction,
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
    const debounceCreateGrid = debounce(() => createGrid(current), 150);
    handleResize(debounceCreateGrid);

    // Draggable
    createDraggable(".draggable", current);
    const debounceCreateDraggable = debounce(
      () => createDraggable(".draggable", current),
      150
    );
    handleResize(debounceCreateDraggable);

    return () => {
      window.removeEventListener("resize", debounceCreateGrid, false);
      window.removeEventListener("resize", debounceCreateDraggable, false);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className={classNames(
        className,
        "tiles drop-zone grid h-full w-full grid-cols-dragon-drop grid-rows-dragon-drop"
      )}
    />
  );
}
