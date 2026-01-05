export const hiddenLoader = (box) => {
  const relative = box.closest("[data-loader-relative]");

  if (!relative) return;

  const loader = relative.querySelector("[data-loader-box]");

    if (loader) loader.remove();

  const loadingElenent = relative.querySelector("[data-loading]");

  if (loadingElenent) {
    loadingElenent.setAttribute("data-loading", "false");
  }
};
