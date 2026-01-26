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

  const form = box.closest("form.form");

  if (!form) return;

  box.innerHTML = "";

  let html = "";

  if ((form.dataset.form === "reset-password")) {
    html = getSuccesResetBox();
  }

  if ((form.dataset.form === "create-password")) {
    html = getSuccessCreateBox();
  }

  box.insertAdjacentHTML("beforeend", html);
};

const getSuccesResetBox = () => {
  return `<div class="form-auth__header">
                  <h2 class="h1-mobile">Almost there!!</h2>
                </div>

                <div class="textbox">
                  <p class="p3 text-dark-500">
                    An email with further instructions on how to reset your
                    password has been successfully sent to your email address.
                  </p>
                </div>

                <div class="form-auth__btns">
                  <a
                    href="/create-password.html"
                    aria-label="Перейти на смену пароля"
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

const getSuccessCreateBox = () => {
  return `<div class="form-auth__header">
                  <h2 class="h1-mobile">Done!</h2>
                </div>

                <div class="textbox">
                  <p class="p3 text-dark-500">
                    A new password for your account has been successfully set.
                  </p>
                </div>

                <div class="form-auth__btns form-auth__btns--two">
                  <a
                    href="/login.html"
                    aria-label="Перейти на страницу входа"
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

                  <a
                    href="/login.html"
                    aria-label="Перейти на страницу входа"
                    title="Login"
                    class="button button--bg-secondary-300"
                  >
                    <div class="button__block">
                      <p class="p2 medium-font">Login</p>

                      <div class="icon" style="rotate: -45deg">
                        <span class="kit-icon arrow-right-md"></span>
                      </div>
                    </div>
                  </a>
                </div>`
}
