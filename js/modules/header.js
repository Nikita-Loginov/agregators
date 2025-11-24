export const getHeightHeader = () => {
  const header = document.querySelector("header.header");

  if (!header) return;

  const styles = window.getComputedStyle(header);
  const height = styles.getPropertyValue("height");

  document.documentElement.style.setProperty("--header-height", `${height}`);
};
