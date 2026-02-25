import { renderTabs } from "./renderTabs.js";
import { renderSlides } from "./renderSlides.js";

export const initGallery = (slide, modalBlock, skipClick = false) => {
  const galleryItem = slide?.closest("[data-gallery-item]");
  const galleryName =
    galleryItem?.dataset.galleryRelativeName ||
    galleryItem?.closest("[data-gallery-relative-name]")?.dataset
      .galleryRelativeName ||
    modalBlock?.querySelector(".tabs-box[data-gallery-name]")?.dataset
      .galleryName;

  if (!galleryName) return;

  const galleryRoot = document.querySelector(
    `[data-gallery-relative-name="${galleryName}"]`
  );
  if (!galleryRoot) return;

  const allSlides = Array.from(
    galleryRoot.querySelectorAll("[data-gallery-box] [data-gallery-item]")
  ).map((s) => ({
    block: s.dataset.block,
    type: s.dataset.block.startsWith("video") ? "video" : "img",
    html: s.querySelector(".gallery-simple__img-box")?.innerHTML || s.querySelector("[data-gallery-content]")?.innerHTML,
  }));

  // console.log(allSlides)

  const activeBlock = slide?.dataset.block || allSlides[0]?.block;
  const activeType = activeBlock.startsWith("video") ? "video" : "img";

  const tabsBox = modalBlock.querySelector(".tabs-box");
  if (tabsBox) {
    renderTabs(tabsBox, allSlides, modalBlock, activeType);
    tabsBox.dataset.galleryItem = galleryName;
  }

  renderSlides(modalBlock, allSlides, activeType, activeBlock);
};
