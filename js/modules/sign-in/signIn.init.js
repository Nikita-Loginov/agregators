import { isFormValid } from "../validate.js";
import { signInState } from "./signIn.state.js";
import { renderStep } from "./signIn.handlers.js";
import { initFormState, updateFormData } from "./signIn.stateManager.js";
import { SIGN_IN_CONFIG } from "./signIn.config.js";

export const initSignIn = () => {
  const firstForm = document.querySelector(".sign-in__content");
  const secondForm = document.querySelector(".form-sign");

  firstForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!isFormValid(firstForm)) return;

    const selected = firstForm.querySelector('input[name="signType"]:checked');
    signInState.type = selected?.dataset.signType;

    if (!signInState.type) return;

    initFormState(SIGN_IN_CONFIG[signInState.type]);

    firstForm.classList.add("hidden");
    secondForm.classList.add("active");
    signInState.stepIndex = 0;

    renderStep(secondForm);
  });

  secondForm.addEventListener("click", (e) => {
    if (e.target.closest("[data-back]")) {
      if (signInState.stepIndex > 0) {
        signInState.stepIndex--;
        renderStep(secondForm);
      } else {
        secondForm.classList.remove("active");
        firstForm.classList.remove("hidden");
      }
    }

    if (e.target.closest("[data-close]")) {
      e.preventDefault();
      location.replace("/login.html");
    }
  });

  secondForm.addEventListener("input", (e) => {
    const name = e.target.name;
    if (!name) return;

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateFormData(name, value);
  });

  secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isFormValid(secondForm)) return;

    const steps = SIGN_IN_CONFIG[signInState.type];

    if (signInState.stepIndex < steps.length - 1) {
      signInState.stepIndex++;
      renderStep(secondForm);
    }
  });
};
