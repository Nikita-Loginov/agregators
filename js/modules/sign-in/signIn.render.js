import { signInState } from "./signIn.state.js";
import { initPasswordStrength } from "../../validation/passwordStrength.js";
import { initPhoneMasks } from "../masks.js";
import { toggleHasValue } from "../functions.js";
import { validateFormField } from "../../validation/index.js";

export const renderHeader = (form, step, totalSteps) => {
  renderProgress(form, step.step, totalSteps);

  form.querySelector("[data-sign-header]").textContent =
    step.headerContent.head;

  const textbox = form.querySelector("[data-sign-textbox]");

  if (textbox && step.headerContent.text) {
    textbox.innerHTML = step.headerContent.text
      .map((t) => `<p class="p2">${t}</p>`)
      .join("");
  }
};

export const renderContentInfo = (box, content) => {
  box.innerHTML = `
      <div class="form-sign__content-info">
        <h3 class="h4">${content.head}</h3>
        ${content.text.map((t) => `<p class="p2">${t}</p>`).join("")}
      </div>
    `;
};

export const renderFooter = (footer, container, stepsLength, currentStep) => {
  container.innerHTML = "";

  // console.log(stepsLength, currentStep);

  const footerContent = document.createElement("div");
  footerContent.className = "form-sign__footer-content";

  const hasButtons = footer.closeBtn;
  const hasSocial = footer.detais?.social;
  const hasModal = footer.detais?.modal;

  if (footer.policy) {
    const checked = signInState.formData["policy"] ? "checked" : "";

    container.insertAdjacentHTML(
      "beforeend",
      `
        <label class="check-simple form__item">
                      <div class="check-simple__content">
                        <div class="check-simple__custom">
                          <input type="checkbox" required name="policy" ${checked}/>

                          <span></span>
                        </div>

                        <div class="check-simple__info">
                          <p class="p3">
                            I give my consent to the processing of my personal
                            data in accordance with the Privacy Policy
                          </p>
                        </div>
                      </div>

                      <div
                        class="check-simple__errors check-simple__errors--bg p4 form__errors"
                      ></div>
                    </label>
      `
    );
  }

  if (stepsLength !== currentStep - 1) {
    const btnContStyle = !hasSocial ? `` : "";
    const boxStyle = !hasSocial ? `style="width: 100%"` : "";

    footerContent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="form-sign__footer-btns" ${boxStyle}>
        <button type="button" data-back class="button button--noBg button--noMassa">
          <div class="icon icon--big">
            <span class="kit-icon chevron-left"></span>
          </div>
          
          <p class="p2-add text-secondary-100 medium-font">Back<p>
        </button>
        <button ${btnContStyle} type="submit" class="button button--lg button--rounded-md button--bg-secondary-100 form-sign__footer-btn-continue">
          <p class="p2 medium-font">Continue</p>
          <div class="icon icon--big">
            <span class="kit-icon chevron-right"></span>
          </div>
        </button>
      </div>
    `
    );
  }

  if (hasButtons && hasSocial) {
    footerContent.insertAdjacentHTML(
      "beforeend",
      `<p class="p2 text-dark-600">Or</p>`
    );
  }

  if (hasSocial) {
    footerContent.insertAdjacentHTML("beforeend", renderSocials());
  }

  if (hasModal) {
    footerContent.insertAdjacentHTML(
      "beforeend",
      renderBtnModal(footer.detais?.modal)
    );

    container.appendChild(footerContent);
  }

  // if (footer.closeBtn) {
  //   footerContent.insertAdjacentHTML(
  //     "beforeend",
  //     `
  //     <a href="/login.html" data-close class="button button--lg button--rounded-md button--bg-primary-100" style="margin: 0 auto;">
  //       <div class="icon icon--big">
  //         <span class="kit-icon close-md"></span>
  //       </div>

  //       <p class="p2 medium-font">Close</p>
  //     </a>
  //   `
  //   );
  // }

  if (stepsLength === currentStep - 1) {
    return;
  }

  container.appendChild(footerContent);
};

export const renderProgress = (form, currentStep, totalSteps) => {
  const number = form.querySelector("[data-propgress-number]");
  const itemsContainer = form.querySelector("[data-propgress-items]");

  number.textContent = `Step ${currentStep} of ${totalSteps}`;

  itemsContainer.innerHTML = "";

  for (let i = 0; i < totalSteps; i++) {
    const div = document.createElement("div");
    div.className = "propgress__item";

    if (i < currentStep) div.classList.add("active");

    itemsContainer.appendChild(div);
  }
};

export const renderSocials = () => `
  <div class="form-sign__footer-socials">
    <button class="button button--bg-gray-300 button--circle button--circle-2md button--hover-white" type="button">
      <div class="icon"><svg><use xlink:href="#apple-icon"></use></svg></div>
    </button>
    <button class="button button--bg-gray-300 button--circle button--circle-2md button--hover-white" type="button">
      <div class="icon"><svg><use xlink:href="#facebook-icon"></use></svg></div>
    </button>
    <button class="button button--bg-gray-300 button--circle button--circle-2md button--hover-white" type="button">
      <div class="icon"><svg><use xlink:href="#twiter-icon"></use></svg></div>
    </button>
    <button class="button button--bg-gray-300 button--circle button--circle-2md button--hover-white" type="button">
      <div class="icon"><svg><use xlink:href="#vk-icon"></use></svg></div>
    </button>
  </div>
`;

export const renderBtnModal = (modalInfo) => {
  const { icon, text, modalName } = modalInfo;

  return `<button class="button button--bg-secondary-300 modal-open" type="button" data-modal="${modalName}">
                  <p class="p2">${text}</p>

                  ${icon}
                </button>`;
};

export const renderBody = (form, step) => {
  const box = form.querySelector(".form-sign__box");
  const inputs = form.querySelector("[data-sign-inputs]");
  const boxInfo = form.querySelector(".form-sign__content-info");
  const headerForm = form.querySelector(".form-sign__header");

  if (step.form) {
    box.style.display = "";
    inputs.innerHTML = "";

    step.form.items.forEach((item) => {
      const currentValue = signInState.formData[item.typeItem] ?? "";

      if (item.type === "input") {
        inputs.classList.remove("form-sign__checks");

        const isState = item.state;

        const inputsCount = inputs.children.length;
        const errorStyle = isState ? `style="display: none"` : "";

        if (item.typeInput === "tel") {
          inputs.insertAdjacentHTML(
            "beforeend",
            `<div class="input-box input-box--white form__item input-tel-wrapper dropdown-tel">
              <div class="input-box__content dropdown">
                <p class="p3 medium-font input-box__label">${item.head}</p>

                <div class="input-box__info popup-select">
                  <input
                    type="${item.typeInput}"
                    name="${item.typeItem}"
                    placeholder="${item.placeholder}"
                    value="${currentValue}"
                    required
                  />

                  <div class="input-box__icon text-green-100">
                    <div class="icon icon--big">
                      <span class="kit-icon check-big"></span>
                    </div>
                  </div>
                </div>

                <div class="dropdown__content"></div>
              </div>

              <p class="input-box__errors p4 form__errors"></p>
            </div>`
          );

          initPhoneMasks(form);
        } else {
          const inputBoxClass = `input-box input-box--white form__item ${
            item.bigInput ? "form-sign__input-big" : ""
          }`;

          inputs.insertAdjacentHTML(
            "beforeend",
            `
            <div class="${inputBoxClass}">
              <label class="input-box__content">
                <p class="p3 medium-font input-box__label">${item.head}</p>
                <div class="input-box__info">
                  <input
                    type="${item.typeInput}"
                    name="${item.typeItem}"
                    placeholder="${item.placeholder}"
                    value="${currentValue}"
                    required
                  />
  
                  <div class="input-box__icon text-green-100">
                    <div class="icon icon--big">
                      <span class="kit-icon check-big"></span>
                    </div>
                  </div>
                </div>
              </label>
  
              ${
                isState
                  ? `<div class="input-box__states">
                <div class="input-box__states-header">
                  <div class="input-box__states-line">
                    <div class=""></div>
                  </div>
  
                  <p class="input-box__states-status">Weak</p>
                </div>
  
                <div class="input-box__states-content">
                  <div class="input-box__states-items">
                    <div class="input-box__states-item">
                      <div class="input-box__states-icon">
                        <p class="p4">8+ characters</p>
                      </div>
                    </div>
  
                    <div class="input-box__states-item">
                      <div class="input-box__states-icon">
                        <p class="p4">1 digit</p>
                      </div>
                    </div>
  
                    <div class="input-box__states-item">
                      <div class="input-box__states-icon">
                        <p class="p4">1 letter</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
                  : ""
              }
  
              <p class="input-box__errors p4 form__errors" ${errorStyle}></p>
            </div>
          `
          );
        }

        if (isState) {
          const addedElement = inputs.children[inputsCount];

          initPasswordStrength(addedElement);
        }
      }

      if (item.type === "radio") {
        inputs.classList.add("form-sign__checks");

        const currentValue = signInState.formData[item.name];
        const isChecked = currentValue === item.typeItem;

        inputs.insertAdjacentHTML(
          "beforeend",
          `<label class="check-big-item form__item">
                      <input
                       name="${item.name}"
                        type="radio"
                        class="check-big-item__hidden"
                        value="${item.typeItem}"
                        ${isChecked ? "checked" : ""}
                      />

                      <div class="check-big-item__content">
                        <div class="check-big-item__radio"></div>

                        <div class="check-big-item__info">
                          <p class="p2 medium-font">${item.title}</p>

                          <div class="textbox">
                            ${item.text}
                          </div>
                        </div>
                      </div>

                      <div
                        class="form__errors p4"
                        style="color: var(--primary-color-500)"
                      ></div>
                    </label>`
        );
      }
    });

    if (step.form.important) {
      const checked = signInState.formData["important"] ? "checked" : "";

      const { title, text, icon } = step.form.important;

      inputs.insertAdjacentHTML(
        "beforeend",
        `<div class="warning">
                  <div class="warning__header">
                    <div class="icon icon--lg text-yellow-300">
                      <span class="kit-icon ${icon || "wavy-warning"}"></span>
                    </div>

                    <p class="p2 medium-font">
                      ${title}
                    </p>
                  </div>

                  <div class="warning__content" style="padding-left: 4px;">
                    <label class="check-simple check-simple--primary-100 check-simple--center form__item">
                      <div class="check-simple__content" style="gap:15px;">
                        <div class="check-simple__custom">
                          <input type="checkbox" name="important" ${checked}/>

                          <span></span>
                        </div>

                        <div class="check-simple__info">
                           ${text.map((t) => `<p class="p3">${t}</p>`).join("")}
                        </div>
                      </div>

                      <div class="check-simple__errors form__errors p4"></div>
                    </label>
                  </div>
                </div>`
      );
    }

    const formItems = box.querySelectorAll(".form__item");

    formItems.forEach((formItem) => {
      const input = formItem.querySelector("input");

      toggleHasValue(input);
      validateFormField(formItem, { showError: false });
    });
  } else {
    box.innerHTML = "";
    box.style.display = "none";

    const infoBlock = document.createElement("div");
    infoBlock.className = "form-sign__content-info";

    if (boxInfo) {
      boxInfo.innerHTML = "";
    }

    infoBlock.innerHTML = `
      
        <div class="form-sign__content-info-icon">
        
        </div>

        <div class="form-sign__content-info-details">
          <h3 class="p2 medium-font">${step.content.head}</h3>

          ${
            step.content.text
              ? `<div class="textbox">
            ${step.content.text.map((t) => `<p class="p3">${t}</p>`).join("")}
          </div>`
              : ""
          }
          
        </div>
        
     
    `;

    headerForm.after(infoBlock);
  }
};

export const renderBreadcrumbs = (form, step) => {
  if (!form || !step.breadcrumbs) return;

  const main = form.closest("main.main");

  if (!main) return;

  const breadcrumbsList = main.querySelector(".breadcrumbs__list");

  if (!breadcrumbsList) return;

  breadcrumbsList.innerHTML = "";

  step.breadcrumbs.forEach((breadcrumb, index) => {
    const { name, href } = breadcrumb;

    const last = step.breadcrumbs.length - 1 === index;
    const classBreadcrumbItem = last
      ? "breadcrumbs__item"
      : "breadcrumbs__item link active active-noColor active-line";

    breadcrumbsList.insertAdjacentHTML(
      "beforeend",
      `<li class="breadcrumbs__link">
                    ${
                      !last
                        ? `<a
                      href="${href}"
                      aria-label="Вернуться на ${name}"
                       title="${name}"
                      class="${classBreadcrumbItem}"
                      >${name}</a
                    >`
                        : `<span
                      class="${classBreadcrumbItem}"
                      >${name}</span
                    >`
                    }
                    
                  </li>`
    );
  });
};
