import { isFormValid } from "./validate.js";

export const resetPasswordInit = (e) => {
  const { target } = e;

  if (!target.closest("[data-reset-btn]")) return;

  const form = target.closest("form.form-auth");

  if (!form) return;

  if (isFormValid(form)) {
    renderSuccesBox(form);
  }
};

const renderSuccesBox = (box) => {
  if (!box) return;

  box.innerHTML = "";

  const html = getSuccesBox();

  box.insertAdjacentHTML("beforeend", html);
};

const getSuccesBox = () => {
  return `<div class="form-auth__header">
                  <h2 class="h1-mobile">Done!</h2>
                </div>

                <div class="textbox">
                  <p class="p3 text-dark-500">
                    An email with further instructions on how to reset your
                    password has been successfully sent to your email address.
                  </p>
                </div>

                <div class="form-auth__btns">
                  <a
                    href="/"
                    aria-label="Перейти на главную"
                    title="Close"
                    class="button button--bg-secondary-200"
                  >
                    <div class="button__block">
                      <div class="icon">
                        <span class="kit-icon close-md"></span>
                      </div>

                      <p class="p2 medium-font">Close</p>
                    </div>
                  </a>
                </div>`;
};
