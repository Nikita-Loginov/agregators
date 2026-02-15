import { classAction } from "./classActions.js";

let prevActiveAccordeonItem;
let currentResizeHandler = null;

export function toggleAccordeonItems(e) {
  const { target } = e;

  const closeTrigger = target.closest("[data-close-accordeon]");

  if (closeTrigger) {
    const item = closeTrigger.closest(".accordeon__item");

    if (item && item.classList.contains("active")) {
      classAction(item, "active", "remove");
      setHeightAnswer(item);
      updateAccordeonButtonText(item);

      if (prevActiveAccordeonItem === item) {
        prevActiveAccordeonItem = null;
      }
    }

    return;
  }

  if (target.closest(".accordeon__question")) {
    const relative = target.closest(".accordeon");
    const relativeItem = target.closest(".accordeon__item");
    const maxWidth = parseInt(relative.dataset.width) || 1023;

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
    }

    if (maxWidth > window.innerWidth) {
      classAction(relativeItem, "active", "toggle");

      setHeightAnswer(relativeItem);

      updateAccordeonButtonText(relativeItem);

      currentResizeHandler = () => setHeightAnswer(relativeItem);
      window.addEventListener("resize", currentResizeHandler);

      if (prevActiveAccordeonItem && prevActiveAccordeonItem !== relativeItem) {
        if (!relative.classList.contains("accordeon--showMore")) {
          classAction(prevActiveAccordeonItem, "active", "remove");
        }
        setHeightAnswer(prevActiveAccordeonItem);
        updateAccordeonButtonText(prevActiveAccordeonItem);
      }

      prevActiveAccordeonItem = relativeItem;
    }
  }

  if (target.closest(".accordeon__show-much")) {
    const relative = target.closest(".accordeon");
    const relativeItems = relative.querySelectorAll(".accordeon__item");

    relativeItems.forEach((item) => {
      if (!item.classList.contains("active")) {
        classAction(item, "active", "add");
        setHeightAnswer(item);

        const resizeHandler = () => setHeightAnswer(item);
        window.addEventListener("resize", resizeHandler);

        if (currentResizeHandler) {
          window.removeEventListener("resize", currentResizeHandler);
        }
        currentResizeHandler = resizeHandler;
      }
    });

    prevActiveAccordeonItem = relativeItems[relativeItems.length - 1];
  }
}

export function initAccordeonActiveItems() {
  const accordeonItems = document.querySelectorAll(".accordeon__item");

  accordeonItems.forEach((item) => {
    const relative = item.closest(".accordeon");
    const maxWidth = parseInt(relative.dataset.width) || 1023;

    if (
      item.classList.contains("active-first") &&
      maxWidth > window.innerWidth
    ) {
      classAction(item, "active", "add");
      setHeightAnswer(item);
      updateAccordeonButtonText(item);
      prevActiveAccordeonItem = item;
    }
  });
}

function resetAccordeon() {
  const accordeonItems = document.querySelectorAll(".accordeon__item");
  prevActiveAccordeonItem = null;

  accordeonItems.forEach((item) => {
    classAction(item, "active", "remove");
    updateAccordeonButtonText(item);

    const itemAnswer = item.querySelector(".accordeon__answer");

    itemAnswer.style.maxHeight = "";
  });
}

const resizeObserver = new ResizeObserver((entries) => {
  if (window.innerWidth > 1023) {
    resetAccordeon();

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
      currentResizeHandler = null;
    }
  }
});

resizeObserver.observe(document.body);

function setHeightAnswer(item) {
  const itemAnswer = item.querySelector(".accordeon__answer");
  const paddingTop = Number(itemAnswer?.dataset?.paddingTop) || 12;

  if (item.classList.contains("active")) {
    itemAnswer.style.maxHeight = itemAnswer.scrollHeight + paddingTop + "px";
  } else {
    itemAnswer.style.maxHeight = "0";
  }
}

function updateAccordeonButtonText(item) {
  const question = item.querySelector(".accordeon__question");
  if (!question) return;

  const textEl = question.querySelector(".accordeon__btn-text");
  if (!textEl) return;

  const textOpen = question.dataset.textOpen;
  const textClose = question.dataset.textClose;

  if (!textOpen || !textClose) return;

  textEl.textContent = item.classList.contains("active") ? textOpen : textClose;
}
