export function setPageSize() {
  document.documentElement.style.setProperty(
    "--pageHeight",
    `${window.innerHeight}px`
  );
  document.documentElement.style.setProperty(
    "--pageWidth",
    `${window.innerWidth}px`
  );
}
