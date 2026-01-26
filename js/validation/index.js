import { validationRules } from "./rules.js";
import { validators } from "./validators.js";
import { classAction } from "../modules/classActions.js";

export const validateFormField = (formItem) => {
  const field = formItem.querySelector(
    "input, textarea, select, .selected-option"
  );
  const errorBox = formItem.querySelector(".form__errors");
  const name = field.name;

  const rules = validationRules[name];
  if (!rules) return true;

  let valid = true;
  let message = "";

  for (const rule in rules) {
    if (rule === "message" || rule === "type" || rule === "hint") continue;

    const value = field.value || "";

    if (rule === "required" && rules.required) {
      if (rules.type === "checkbox") {
        valid = validators.checkbox(field);
      } else {
        valid = validators.required(value);
      }
      message = rules.message?.required || "";
    }

    if (valid && rule === "minLength") {
      valid = validators.minLength(value, rules.minLength);
      message = rules.message?.minLength || "";
    }

    if (valid && rule === "pattern") {
      valid = validators.pattern(value, rules.pattern);
      message = rules.message?.pattern || "";
    }

    if (valid && rules.type === "phone") {
      valid = validators.phone(field);
      message = rules.message?.invalid || "";
    }

    if (valid && rules.type === "select") {
      valid = validators.select(field);
      message = rules.message?.required || "";
    }

    if (valid && rules.type === "checkbox") {
      valid = validators.checkbox(field);
      message = rules.message?.required || "";
    }

    if (valid && rule === "match") {
      valid = validators.match(value, formItem.closest("form"), rules.match);
      message = rules.message?.match || "";
    }

    if (!valid) break;
  }

  if (!valid && rules.hint) {
    message = `${message}. ${rules.hint}`;
  }

  errorBox.textContent = valid ? "" : message;

  classAction(formItem, "error", valid ? "remove" : "add");
  classAction(formItem, "success", valid ? "add" : "remove");

  field.setAttribute("aria-invalid", String(!valid));

  return valid;
};

export const clearAllFormErrors = (e) => {
  if (e.target.closest('form')) return;
  const errorItems = document.querySelectorAll(
    ".form__item.error, .form__item [aria-invalid='true']"
  );

  errorItems.forEach((itemOrField) => {
    const formItem = itemOrField.classList.contains("form__item")
      ? itemOrField
      : itemOrField.closest(".form__item");

    if (!formItem) return;

    const errorBox = formItem.querySelector(".form__errors");
    const field = formItem.querySelector(
      "input, textarea, select, .selected-option"
    );

    errorBox && (errorBox.textContent = "");
    field?.setAttribute("aria-invalid", "false");

    formItem.classList.remove("error", "success");
  });
};

