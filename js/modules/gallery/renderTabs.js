import { renderSlides } from "./renderSlides.js";

export const renderTabs = (tabsBox, allSlides, modalBlock, activeType) => {
  const tabContainer = tabsBox.querySelector(".tab-btns");
  if (!tabContainer) return;

  tabContainer.innerHTML = "";

  const photoSlides = allSlides.filter((s) => s.type === "img");
  const videoSlides = allSlides.filter((s) => s.type === "video");

  const createTab = (type, count) => {
    const label = document.createElement("label");
    label.className = "check";
    label.dataset.btnTab = type;

    label.innerHTML = `
      <div class="check__info">
        <input type="radio" name="gallery-popup" ${
          type === activeType ? "checked" : ""
        }>
        <div class="check__info-content">
          <div class="icon icon--big">
            <span class="kit-icon ${
              type === "img" ? "image" : "play-circle"
            }"></span>
          </div>
          <span class="p2">${
            type === "img" ? "Photos" : "Videos"
          } (${count})</span>
        </div>
      </div>
    `;

    label.addEventListener("click", () => {
      const firstSlide = allSlides.find((s) => s.type === type);
      if (firstSlide)
        renderSlides(modalBlock, allSlides, type, firstSlide.block);
    });

    return label;
  };

  if (photoSlides.length)
    tabContainer.appendChild(createTab("img", photoSlides.length));
  if (videoSlides.length)
    tabContainer.appendChild(createTab("video", videoSlides.length));
};
