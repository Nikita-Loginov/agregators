import { initGallery } from "./gallery/index.js";

const CONFIG_MODAL = {
  outsideHiddenModals: false,
  keyboard: {
    escClose: true,
  },
};

const keyboardEffects = {
  Escape: {
    enabled: () => CONFIG_MODAL.keyboard.escClose,
    handler: (modal) => closeModalCore(modal),
  },
};

const openModal = (e) => {
  const modalBtn = e.target.closest(".modal-open");

  if (!modalBtn) return;

  const nameModal = modalBtn.dataset.modal;
  if (!nameModal) return;

  const modalBlock = document.querySelector(`.${nameModal}`);

  if (!modalBlock) return;

  const modals = document.querySelectorAll(".modalBlock");

  if (modalBtn.getAttribute("type") === "submit") return;

  openModalStep(modalBtn, modals, modalBlock);
};

export const openModalStep = (modalBtn, modals, modalBlock) => {
  modals.forEach((modal) => {
    modal.classList.remove("open");
  });

  if (modalBlock.classList.contains("modalBlockTwo")) {
    getImgSrc(modalBtn, modalBlock);
  }

  if (modalBlock.classList.contains("videoModal")) {
    getVideoSrc(modalBtn, modalBlock);
  }

  if (modalBlock.classList.contains("galleryModal")) {
    initGallery(modalBtn, modalBlock);
  }

  if (modalBlock.classList.contains("successDownload")) {
    getDownloadFile(modalBtn, modalBlock);
  }

  modalBlock.classList.add("open");
  document.body.classList.add("open-modal");
  document.documentElement.classList.add("open-modal");
};

const getDownloadFile = (btn, modalBlock) => {
  if (!btn) return;

  const downloadFilePath = btn.dataset.downloadFile;

  if (downloadFilePath) {
    setDownloadFile(downloadFilePath, modalBlock);
  } else {
    const href = btn.getAttribute("href");

    if (href) {
      setDownloadFile(href, modalBlock);
    }
  }
};

const setDownloadFile = (filePath, modalBlock) => {
  if (
    modalBlock.classList.contains("successModal") &&
    modalBlock.classList.contains("successDownload")
  ) {
    const downloadFileBlock = modalBlock.querySelector(
      ".successDownload__file"
    );

    if (downloadFileBlock) {
      downloadFileBlock.innerHTML = "";

      const fileExtension = filePath.split(".").pop().toLowerCase();
      let fileHtml = "";

      if (
        ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(fileExtension)
      ) {
        fileHtml = `
          <div class="successDownload__img">
            <picture>
              <source srcset="${filePath} 1x, ${filePath} 2x" />
              <img src="${filePath}" alt="Downloaded file" />
            </picture>
          </div>
        `;
      } else if (["pdf", "doc", "docx", "txt"].includes(fileExtension)) {
        const fileName = filePath.split("/").pop();
        fileHtml = `
          <div class="successDownload__document">
            <div class="icon icon--big">
              <span class="kit-icon document"></span>
            </div>
            <p class="p2 regular-font">${fileName}</p>
          </div>
        `;
      } else {
        const fileName = filePath.split("/").pop();
        fileHtml = `
          <div class="successDownload__generic">
            <div class="icon icon--big">
              <span class="kit-icon download-file"></span>
            </div>
            <p class="p2 regular-font">${fileName}</p>
          </div>
        `;
      }

      downloadFileBlock.insertAdjacentHTML("beforeend", fileHtml);
    }
  }
};

const getImgSrc = (btn, modalBlock) => {
  const img = btn.querySelector(".modal-img");

  if (img) {
    const src = img.getAttribute("src");

    setImgSrc(src, modalBlock);
  }
};

const getVideoSrc = (btn, modalBlock) => {
  if (!btn) return;

  const link = btn.dataset.linkVideo;

  setVideoSrc(link, modalBlock);
};

const setImgSrc = (src, modalBlock) => {
  const imgModalBlock = modalBlock.querySelector(".modalBlockTwo__img");
  imgModalBlock.textContent = "";

  const html = `
            <picture>
              <source srcset="${src} 1x, ${src} 2x">
              <img src=${src} alt="фотография здания">
            </picture>
            `;

  imgModalBlock.insertAdjacentHTML("beforeend", html);
};

const setVideoSrc = (src, modalBlock) => {
  if (!src) return;

  const blockVideo = modalBlock.querySelector(".videoModal__video");
  blockVideo.innerHTML = "";

  const html = ` <iframe
                width="720"
                height="405"
                src=${src}
                frameborder="0"
                allow="clipboard-write; autoplay"
                webkitAllowFullScreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>`;

  blockVideo.insertAdjacentHTML("beforeend", html);
};

export const closeModalCore = (modalBlock) => {
  if (!modalBlock) return;

  if (modalBlock.dataset.reset !== "no-clear") {
    clearFormOnModalClose(modalBlock);
  }

  modalBlock.classList.remove("open");

  if (!document.querySelector(".modalBlock.open")) {
    document.body.classList.remove("open-modal");
    document.documentElement.classList.remove("open-modal");
  }
};

const closeModal = (e) => {
  const modalBlock = e.target.closest(".modalBlock");
  if (!modalBlock) return;

  const outsideShow = CONFIG_MODAL.outsideHiddenModals;
  const isClickOnOverlay = e.target === modalBlock;
  const isClickOnCloseBtn = e.target.closest(".modal-close");

  if (isClickOnOverlay && !outsideShow) {
    return;
  }

  if (isClickOnOverlay || isClickOnCloseBtn) {
    closeModalCore(modalBlock);
  }
};

export const closeAllModals = () => {
  const openModals = document.querySelectorAll(".modalBlock.open");

  openModals.forEach((modal) => {
    modal.classList.remove("open");
  });

  if (document.querySelectorAll(".modalBlock.open").length === 0) {
    document.body.classList.remove("open-modal");
    document.documentElement.classList.remove("open-modal");
  }
};

export const checkStartOpen = () => {
  const modals = document.querySelectorAll(".modalBlock");

  modals.forEach((modal) => {
    if (
      modal.classList.contains("open") ||
      modal.classList.contains("openFinish")
    ) {
      document.body.classList.add("open-modal");
      document.documentElement.classList.add("open-modal");

      if (modal.classList.contains("openFinish")) {
        modal.classList.add("open");
      }
    }
  });
};

export function initModal(e) {
  openModal(e);
  closeModal(e);
}

export const clearFormOnModalClose = (modalBlock) => {
  if (!modalBlock) return;

  const form = modalBlock.querySelector("form");
  if (!form) return;

  form.reset();

  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    const inputBox = input.closest(".input-box");
    input.classList.remove("has-value");
    if (inputBox) inputBox.classList.remove("has-value");
  });

  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    if (select.tomselect) {
      select.tomselect.clear(true);
      select.tomselect.refreshOptions(false);
    }
  });
};

export const handleKeyboardEffectsModal = (e) => {
  const modal = document.querySelector(".modalBlock.open");
  if (!modal) return;

  const effect = keyboardEffects[e.key];
  
  if (!effect) return;

  if (!effect.enabled(modal)) return;

  effect.handler(modal);
};
