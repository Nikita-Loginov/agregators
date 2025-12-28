export const toggleSibebar = (e) => {
  const { target } = e;

  if (target.closest('[data-block="sibebar-box__close"]')) {
    closeSibebar(target.closest('[data-block="sibebar-box__close"]'));
  }

  if (target.closest('[data-block="sibebar-box__open"]')) {
    openSibebar(target.closest('[data-block="sibebar-box__open"]'));
  }
};

const closeSibebar = (btnClose) => {
  const { sibebarRelative, sibebar } = findElements(btnClose);

  if (sibebarRelative && sibebar) {
    sibebarRelative.classList.remove("sibebar-open");
    sibebar.classList.remove("open");

    initResize();
  }
};

const openSibebar = (btnClose) => {
  const { sibebarRelative, sibebar } = findElements(btnClose);

  if (sibebarRelative && sibebar) {
    sibebarRelative.classList.add("sibebar-open");
    sibebar.classList.add("open");

    initResize();
  }
};

const initResize = () => {
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 300);
};

const findElements = (target) => {
  if (!target) return null;

  const relative = target.closest('[data-block="sibebar-box"]');

  if (relative) {
    const sibebar = relative.querySelector('[data-block="sibebar-box__block"]');

    return {
      sibebar,
      sibebarRelative: relative,
    };
  }

  return null;
};
