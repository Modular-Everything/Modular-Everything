import gsap from "gsap";

/*
This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.

Features:
 - Uses yPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates up or down enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingBottom.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
   - elements - an Array of the elements that are being controlled by the timeline
 */
export const verticalLoop = (items, config) => {
  items = gsap.utils.toArray(items);
  config = config || {};
  const { onChange } = config;
  let lastIndex = 0;
  const tl = gsap.timeline({
    repeat: config.repeat,
    onUpdate:
      onChange &&
      function () {
        const i = tl.closestIndex();
        if (lastIndex !== i) {
          lastIndex = i;
          onChange(items[i], i);
        }
      },
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });
  const { length } = items;
  const startY = items[0].offsetTop;
  const times = [];
  const heights = [];
  const spaceBefore = [];
  const yPercents = [];
  let curIndex = 0;
  const { center } = config;
  const clone = (obj) => {
    const result = {};
    let p;
    for (p in obj) {
      result[p] = obj[p];
    }
    return result;
  };
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
  let timeOffset = 0;
  const container =
    center === true
      ? items[0].parentNode
      : gsap.utils.toArray(center)[0] || items[0].parentNode;
  let totalHeight;
  const getTotalHeight = () =>
    items[length - 1].offsetTop +
    (yPercents[length - 1] / 100) * heights[length - 1] -
    startY +
    spaceBefore[0] +
    items[length - 1].offsetHeight *
      gsap.getProperty(items[length - 1], "scaleY") +
    (Number.parseFloat(config.paddingBottom) || 0);
  const populateHeights = () => {
    let b1 = container.getBoundingClientRect();
    let b2;
    items.forEach((el, i) => {
      heights[i] = Number.parseFloat(gsap.getProperty(el, "height", "px"));
      yPercents[i] = snap(
        (Number.parseFloat(gsap.getProperty(el, "y", "px")) / heights[i]) *
          100 +
          gsap.getProperty(el, "yPercent")
      );
      b2 = el.getBoundingClientRect();
      spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
      b1 = b2;
    });
    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      yPercent: (i) => yPercents[i],
    });
    totalHeight = getTotalHeight();
  };
  let timeWrap;
  const populateOffsets = () => {
    timeOffset = center
      ? (tl.duration() * (container.offsetWidth / 2)) / totalHeight
      : 0;
    center &&
      times.forEach((t, i) => {
        times[i] = timeWrap(
          tl.labels[`label${i}`] +
            (tl.duration() * heights[i]) / 2 / totalHeight -
            timeOffset
        );
      });
  };
  const getClosest = (values, value, wrap) => {
    let i = values.length;
    let closest = 1e10;
    let index = 0;
    let d;
    while (i--) {
      d = Math.abs(values[i] - value);
      if (d > wrap / 2) {
        d = wrap - d;
      }
      if (d < closest) {
        closest = d;
        index = i;
      }
    }
    return index;
  };
  const populateTimeline = () => {
    let i;
    let item;
    let curY;
    let distanceToStart;
    let distanceToLoop;
    tl.clear();
    for (i = 0; i < length; i++) {
      item = items[i];
      curY = (yPercents[i] / 100) * heights[i];
      distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
      distanceToLoop =
        distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
      tl.to(
        item,
        {
          yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            yPercent: snap(
              ((curY - distanceToLoop + totalHeight) / heights[i]) * 100
            ),
          },
          {
            yPercent: yPercents[i],
            duration:
              (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add(`label${i}`, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    timeWrap = gsap.utils.wrap(0, tl.duration());
  };
  const refresh = (deep) => {
    const progress = tl.progress();
    tl.progress(0, true);
    populateHeights();
    deep && populateTimeline();
    populateOffsets();
    deep && tl.draggable
      ? tl.time(times[curIndex], true)
      : tl.progress(progress, true);
  };
  let proxy;
  gsap.set(items, { y: 0 });
  populateHeights();
  populateTimeline();
  populateOffsets();
  window.addEventListener("resize", () => refresh(true));
  function toIndex(index, vars) {
    vars = clone(vars);
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    if (vars.revolutions) {
      time += tl.duration() * Math.round(vars.revolutions);
      delete vars.revolutions;
    }
    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    vars.overwrite = true;
    gsap.killTweensOf(proxy);
    return tl.tweenTo(time, vars);
  }
  tl.elements = items;
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.closestIndex = (setCurrent) => {
    const index = getClosest(times, tl.time(), tl.duration());
    setCurrent && (curIndex = index);
    return index;
  };
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  if (config.draggable && typeof Draggable === "function") {
    proxy = document.createElement("div");
    const wrap = gsap.utils.wrap(0, 1);
    let ratio;
    let startProgress;
    let draggable;
    let dragSnap;
    const align = () =>
      tl.progress(
        wrap(startProgress + (draggable.startY - draggable.y) * ratio)
      );
    const syncIndex = () => tl.closestIndex(true);
    typeof InertiaPlugin === "undefined" &&
      console.warn(
        "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
      );
    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode,
      type: "y",
      onPressInit() {
        gsap.killTweensOf(tl);
        startProgress = tl.progress();
        refresh();
        ratio = 1 / totalHeight;
        gsap.set(proxy, { y: startProgress / -ratio });
      },
      onDrag: align,
      onThrowUpdate: align,
      inertia: true,
      snap: (value) => {
        const time = -(value * ratio) * tl.duration();
        const wrappedTime = timeWrap(time);
        const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
        let dif = snapTime - wrappedTime;
        Math.abs(dif) > tl.duration() / 2 &&
          (dif += dif < 0 ? tl.duration() : -tl.duration());
        return (time + dif) / tl.duration() / -ratio;
      },
      onRelease: syncIndex,
      onThrowComplete: syncIndex,
    })[0];
    tl.draggable = draggable;
  }
  tl.closestIndex(true);
  onChange && onChange(items[curIndex], curIndex);
  return tl;
};