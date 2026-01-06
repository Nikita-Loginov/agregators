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

  const maxItems = getMaxItems(itemsContainer);
  const allItems = itemsContainer.children;

  setVisibleItems(itemsContainer, maxItems);

  const footer = moreItem.querySelector('[data-block="more-footer"]');

  if (allItems.length <= maxItems) {
    if (footer) footer.remove();

    return;
  } else {
    if (footer) footer.classList.add("visible");
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

  if (itemsContainer.classList.contains("more")) {
    showAllItems(itemsContainer);
  } else {
    setVisibleItems(itemsContainer, maxItems);
  }
};

const getMaxItems = (container) => {
  const mediaInit = container.getAttribute("data-media-init");
  const mediaMax = container.getAttribute("data-media-max");
  const defaultMax = parseInt(container.getAttribute("data-max")) || 6;

  if (mediaInit && window.innerWidth <= parseInt(mediaInit)) {
    return mediaMax ? parseInt(mediaMax) : defaultMax;
  }

  return defaultMax;
};

const setVisibleItems = (container, maxItems) => {
  const allItems = container.children;

  Array.from(allItems).forEach((item) => {
    item.classList.remove("item-visible");
  });

  Array.from(allItems).forEach((item, index) => {
    if (index < maxItems) {
      item.classList.add("item-visible");
    }
  });
};

const showAllItems = (container) => {
  const allItems = container.children;

  Array.from(allItems).forEach((item) => {
    item.classList.add("item-visible");
  });
};

export const hideUnnecessaryButtons = () => {
  const allItemsContainers = document.querySelectorAll(
    '[data-block="more-items"]'
  );

  allItemsContainers.forEach((container) => {
    const maxItems = getMaxItems(container);
    const allItems = container.children;

    setVisibleItems(container, maxItems);

    const footer = container
      .closest('[data-block="more-relative"]')
      ?.querySelector('[data-block="more-footer"]');

    if (allItems.length <= maxItems) {
      if (footer) footer.remove();
    } else {
      if (footer) footer.classList.add("visible");
    }
  });
};
