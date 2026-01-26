import { signInState } from "./signIn.state.js";

export const renderHeader = (form, step, totalSteps) => {
  renderProgress(form, step.step, totalSteps);

  form.querySelector("[data-sign-header]").textContent =
    step.headerContent.head;

  const textbox = form.querySelector("[data-sign-textbox]");
  textbox.innerHTML = step.headerContent.text
    .map((t) => `<p class="p2">${t}</p>`)
    .join("");
};

export const renderContentInfo = (box, content) => {
  box.innerHTML = `
      <div class="form-sign__content-info">
        <h3 class="h4">${content.head}</h3>
        ${content.text.map((t) => `<p class="p2">${t}</p>`).join("")}
      </div>
    `;
};

export const renderFooter = (footer, container) => {
  container.innerHTML = "";

  const footerContent = document.createElement("div");
  footerContent.className = "form-sign__footer-content";

  const hasButtons = !footer.closeBtn;
  const hasSocial = footer.detais?.social;

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

  if (hasButtons) {
    footerContent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="form-sign__footer-btns">
        <button type="button" data-back class="button button--noBg button--noMassa">
          Back
        </button>
        <button type="submit" class="button button--lg button--rounded-md button--bg-secondary-100">
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

  if (footer.closeBtn) {
    footerContent.insertAdjacentHTML(
      "beforeend",
      `
      <a href="/login.html" data-close class="button button--lg button--rounded-md button--bg-primary-100" style="margin: 0 auto;">
        <div class="icon icon--big">
          <span class="kit-icon close-md"></span>
        </div>

        <p class="p2 medium-font">Close</p>
      </a>
    `
    );
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
        inputs.insertAdjacentHTML(
          "beforeend",
          `
          <div class="input-box input-box--white form__item">
            <label class="input-box__content">
              <p class="p3 medium-font">${item.head}</p>
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
            <p class="input-box__errors p4 form__errors"></p>
          </div>
        `
        );
      }
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

          <div class="textbox">
            ${step.content.text.map((t) => `<p class="p3">${t}</p>`).join("")}
          </div>
        </div>
        
     
    `;

    headerForm.after(infoBlock);
  }
};
