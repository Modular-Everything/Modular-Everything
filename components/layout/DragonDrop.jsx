import { useRef, useEffect } from "react";

function getDragAfterElement(zone, y) {
  const zones = [...zone.querySelectorAll(".draggable:not(.dragging)")];
  return zones.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }

      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

export function DragonDrop() {
  const wrapper = useRef(null);

  useEffect(() => {
    // Draggable item
    const draggables = wrapper.current.querySelectorAll(".draggable");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging", "opacity-50");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging", "opacity-50");
      });
    });

    // Drop zone handler
    const zone = wrapper.current.querySelector(".drop-zone");

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();

      const afterElement = getDragAfterElement(zone, e.clientY);
      const draggable = wrapper.current.querySelector(".dragging");

      if (afterElement === undefined) {
        zone.append(draggable);
      } else {
        afterElement.before(draggable);
      }
    });
  }, [wrapper]);

  return (
    <div ref={wrapper}>
      <div className="drop-zone bg-pure-black p-4">
        <div
          className="draggable bg-blue p-4 transition-colors duration-150 ease-in-out"
          draggable
        >
          1
        </div>
        <div
          className="draggable bg-dark-grey p-4 transition-colors duration-150 ease-in-out"
          draggable
        >
          2
        </div>
        <div
          className="draggable bg-mid-grey p-4 transition-colors duration-150 ease-in-out"
          draggable
        >
          3
        </div>
        <div
          className="draggable bg-white p-4 transition-colors duration-150 ease-in-out"
          draggable
        >
          4
        </div>
      </div>
    </div>
  );
}
