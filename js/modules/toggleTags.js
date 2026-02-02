const CONFIG = {
  ACTIVE_CLASS: "active",
  TAG_SELECTOR: '[data-block="tag"]',
};

const moveTag = (tag, isActive) => {
  const container = tag.parentElement;

  if (!container) return;

  if (isActive) {
    container.prepend(tag);
  } else {
    container.append(tag);
  }
};

export const toggleTags = (e) => {
  const { target } = e;

  const tag = target.closest(CONFIG.TAG_SELECTOR);
  const closeTagBtn = target.closest('[data-block="tag__close"]');

  if (!tag) return;

  if (closeTagBtn) {
    tag.classList.remove(CONFIG.ACTIVE_CLASS);

    moveTag(tag, false);

    return;
  }

  if (!tag.classList.contains(CONFIG.ACTIVE_CLASS)) {
    tag.classList.add(CONFIG.ACTIVE_CLASS);

    moveTag(tag, true);
  }
};
