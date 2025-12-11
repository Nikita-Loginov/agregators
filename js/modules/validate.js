import { maskTel } from "./masks.js";
import { classAction } from "./classActions.js";
import { openModalStep } from "./modal.js";

export function initFormValidation(form) {
  if (!form) return;

  maskTel();

  form.addEventListener("input", handleFieldChange);
  form.addEventListener("change", handleFieldChange);
  form.addEventListener("submit", handleFormSubmit);
}

function handleFieldChange(event) {
  const field = event.target;
  const formItem = field.closest(".form__item");

  if (formItem) {
    validateField(field);
    updateSubmitButton(field.closest(".form"));
  }
}

export function checkActionInput(formItem) {
  const input = formItem.querySelector("input, textarea");
  // classAction(formItem, "focus", "add");

  if (input.value.length) {
    classAction(formItem, "more", "add");
  } else {
    classAction(formItem, "more", "remove");
  }
}

function validateField(field) {
  const formItem = field.closest(".form__item");
  const errorContainer = formItem.querySelector(".form__errors");
  let isValid = true;
  let errorMessage = "";

  if (field.classList.contains("selected-option")) {
    const realSelect = field
      .closest(".custom-select")
      .querySelector(".real-select");
    isValid = realSelect.value !== "";
    errorMessage = isValid ? "" : field.dataset.empty;
  } else {
    if (field.validity.valueMissing) {
      errorMessage = field.dataset.empty;
      isValid = false;
    } else if (field.validity.patternMismatch) {
      errorMessage = field.dataset.title;
      isValid = false;
    }
  }

  if (errorContainer) {
    errorContainer.textContent = errorMessage;
  }

  if (formItem) {
    classAction(formItem, "error", isValid ? "remove" : "add");
    classAction(formItem, "success", isValid ? "add" : "remove");
  }

  field.setAttribute("aria-invalid", isValid ? "false" : "true");
  return isValid;
}

function updateSubmitButton(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formIsValid = checkFormValidity(form);

  if (submitButton) {
    classAction(submitButton, "disabled", formIsValid ? "remove" : "add");
  }
}

function checkFormValidity(form) {
  const requiredFields = form.querySelectorAll("[required]");

  return Array.from(requiredFields).every((field) => {
    if (field.classList.contains("selected-option")) {
      const realSelect = field
        .closest(".custom-select")
        .querySelector(".real-select");

      return realSelect.value !== "";
    }
    return field.validity.valid;
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (checkFormValidity(form)) {
    form.reset();
    resetSelect(form);
    updateSubmitButton(form);

    const btnModal = event.target.querySelector(
      'button[type="submit"].modal-open'
    );
    const nameModal = btnModal.dataset.modal;
    const modalBlock = document.querySelector(`.${nameModal}`);

    if (btnModal) {
      openModalStep(
        btnModal,
        document.querySelectorAll(`.modalBlock`),
        modalBlock
      );
    }
  } else {
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => validateField(field));
  }
}

function resetSelect(form) {
  const selectsRequired = form.querySelectorAll("select[required]");

  selectsRequired.forEach((select) => {
    const customSelect = select.closest(".custom-select");
    const selectedOption = customSelect.querySelector(".selected-option");
    const optionsList = customSelect.querySelector(".options-list");
    const realSelect = customSelect.querySelector(".real-select");
    const optionFirst = optionsList.querySelectorAll("li")[0];

    if (optionFirst) {
      selectedOption.value = optionFirst.textContent.trim();
      realSelect.value = optionFirst.dataset.value;
    }
  });
}
