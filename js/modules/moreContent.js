export const initMoreBlocks = (
  e,
  { moreText = "More", lessText = "Less" } = {}
) => {
  const moreBtn = e.target.closest('[data-block="more-btn"]');

  if (!moreBtn) return;

  const moreItem = moreBtn.closest('[data-block="more-relative"]');

  if (!moreItem) return;

  const itemsContainer = moreItem.querySelector('[data-block="more-items"]');

  if (!itemsContainer) return;

  const maxItems = parseInt(itemsContainer.getAttribute("data-max")) || 6;
  const allItems = itemsContainer.children;

  if (allItems.length <= maxItems) {
    const footer = moreItem.querySelector('[data-block="more-footer"]');

    if (footer) footer.remove();
    return;
  }

  const moreTextFromAttr = moreBtn.getAttribute("data-more-text") || moreText;
  const lessTextFromAttr = moreBtn.getAttribute("data-less-text") || lessText;

  itemsContainer.classList.toggle("more");
  const buttonText = itemsContainer.classList.contains("more")
    ? lessTextFromAttr
    : moreTextFromAttr;
    
  moreBtn.querySelector('[data-block="more-btn-text"]').textContent =
    buttonText;

  moreBtn.classList.toggle("more");
};

export const hideUnnecessaryButtons = () => {
  const allItemsContainers = document.querySelectorAll(
    '[data-block="more-items"]'
  );

  allItemsContainers.forEach((container) => {
    const maxItems = parseInt(container.getAttribute("data-max")) || 6;
    const allItems = container.children;

    if (allItems.length <= maxItems) {
      const footer = container
        .closest('[data-block="more-relative"]')
        ?.querySelector('[data-block="more-footer"]');
      if (footer) footer.remove();
    }
  });
};
