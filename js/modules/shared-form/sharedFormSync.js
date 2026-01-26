import { sharedFormState } from "./sharedFormState.js";
import { isSupportedElement, getElementValue } from "./sharedFormUtils.js";

export const initSharedFormSync = () => {
  document.addEventListener("input", handleChange);
  document.addEventListener("change", handleChange);
};

export const handleChange = (e) => {
  if (sharedFormState.isSyncing) return;

  const el = e.target;

  if (!el.name) return;

  if (!isSupportedElement(el)) return;

  const formScope = el.closest("[data-form]");
  if (!formScope) return;

  const formName = formScope.dataset.form;
  const value = getElementValue(el);

  if (value === undefined) return;

  if (!sharedFormState[formName]) {
    sharedFormState[formName] = {};
  }

  sharedFormState[formName][el.name] = value;

  // console.log(sharedFormState)
  syncElements(formName, el.name, value, el);
};

export const syncElements = (formName, fieldName, value, sourceEl) => {
  const elements = document.querySelectorAll(
    `[data-form="${formName}"] input[name="${fieldName}"],
     [data-form="${formName}"] select[name="${fieldName}"],
     [data-form="${formName}"] textarea[name="${fieldName}"]`
  );


  sharedFormState.isSyncing = true;

  elements.forEach((el) => {

    if (el === sourceEl) {
      return
    };

    
    if (el.tagName === "SELECT" && el.tomselect) {
      el.tomselect.setValue(value, true);
    } else if (el.type === "radio") {
      
      const radios = document.querySelectorAll(`input[type="radio"][data-name="${el.dataset.name}"]`);
      radios.forEach((radio) => {
        radio.checked = radio.value === value;
      });
    } else {
      el.value = value ?? "";
    }
  });

  sharedFormState.isSyncing = false;
};
