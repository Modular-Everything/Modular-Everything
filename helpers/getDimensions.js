export function getDimensions(image, retina = 1) {
  if (!image?.filename) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: Number(image.filename?.split("/")[5].split("x")[0]) / retina,
    height: Number(image.filename?.split("/")[5].split("x")[1]) / retina,
  };
}
