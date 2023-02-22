import { getFileExtension } from "./getFileExtension";

// eslint-disable-next-line import/no-default-export
export default function imageLoader({ src, width = 0, quality = 80 }) {
  if (getFileExtension(src) === "svg") {
    return src;
  }

  return `${src}/m/${width}x0/filters:quality(${quality})`;
}
