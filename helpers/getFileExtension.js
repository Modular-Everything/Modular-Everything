export function getFileExtension(url) {
  return url.split(/[#?]/u)[0].split(".").pop().trim();
}
