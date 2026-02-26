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

const getMaxLines = (text) => {
  const defaultMax = parseInt(text.dataset.max, 10) || 1;

  const mediaInit = text.dataset.mediaInit;
  const mediaMax = text.dataset.mediaMax;

  if (mediaInit && window.innerWidth <= parseInt(mediaInit, 10)) {
    return mediaMax ? parseInt(mediaMax, 10) : defaultMax;
  }

  return defaultMax;
};

export const initClampText = () => {
  const items = document.querySelectorAll('[data-block="clamp-relative"]');

  items.forEach((item) => {
    const text = item.querySelector('[data-block="clamp-text"]');
    const footer = item.querySelector('[data-block="clamp-footer"]');

    if (!text || !footer) return;

    const maxLines = getMaxLines(text);
    text.style.setProperty("--lines", maxLines);

    updateClampState(text, footer);
  });
};

export const clampTextToggle = (
  e,
  { moreText = "больше", lessText = "меньше" } = {}
) => {
  const btn = e.target.closest('[data-block="clamp-btn"]');
  if (!btn) return;

  const item = btn.closest('[data-block="clamp-relative"]');
  if (!item) return;

  const text = item.querySelector('[data-block="clamp-text"]');
  const footer = item.querySelector('[data-block="clamp-footer"]');
  if (!text || !footer) return;

  const btnTextEl = btn.querySelector('[data-block="clamp-btn-text"]');

  const isOpen = text.classList.toggle("is-open");
  text.classList.toggle("is-clamped", !isOpen);

  const moreTextFromAttr = btn.getAttribute("data-more-text") || moreText;
  const lessTextFromAttr = btn.getAttribute("data-less-text") || lessText;

  if (btnTextEl) {
    btnTextEl.textContent = isOpen ? lessTextFromAttr : moreTextFromAttr;
  }
};

const updateClampState = (text, footer) => {
  const btn = footer.querySelector('[data-block="clamp-btn"]');
  const btnText = btn?.querySelector('[data-block="clamp-btn-text"]');

  text.classList.remove("is-open");

  text.classList.add("is-clamped");

  const isClamped = text.scrollHeight - text.clientHeight > 1;

  if (!isClamped) {
    text.classList.remove("is-clamped");
    footer.classList.remove("visible");

    if (btnText) {
      btnText.textContent = btn.getAttribute("data-more-text") || "больше";
    }

    return;
  }

  footer.classList.add("visible");

  if (btnText) {
    btnText.textContent = btn.getAttribute("data-more-text") || "больше";
  }
};

export const handleMoreContentResize = () => {
  const clampItems = document.querySelectorAll('[data-block="clamp-relative"]');

  clampItems.forEach((item) => {
    const text = item.querySelector('[data-block="clamp-text"]');
    const footer = item.querySelector('[data-block="clamp-footer"]');

    if (!text || !footer) return;

    const maxLines = getMaxLines(text);
    text.style.setProperty("--lines", maxLines);

    const wasOpen = text.classList.contains("is-open");

    // if (!wasOpen) {
    updateClampState(text, footer);
    // }
  });
};
