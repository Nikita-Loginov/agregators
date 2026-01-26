export const isSupportedElement = (el) => {
  return (
    el.tagName === "INPUT" ||
    el.tagName === "SELECT" ||
    el.tagName === "TEXTAREA"
  );
};

export const getElementValue = (el) => {
  
  if (el.tagName === "SELECT" && el.tomselect) {
    
    return el.multiple ? el.tomselect.getValue() : el.tomselect.getValue();
  }

  if (el.type === "checkbox") {
    return el.checked;
  }

  if (el.type === "radio") {
    const formScope = el.closest("form") || document;
    const checkedRadio = formScope.querySelector(`input[name="${el.name}"]:checked`);

    return checkedRadio ? checkedRadio.value : null;
  }

  return el.value;
};

export const setElementValue = (el, value) => {
  if (el.type === "checkbox") {
    el.checked = Boolean(value);
    return;
  }

  if (el.type === "radio") {
    const formScope = el.closest("form") || document;
    const radios = formScope.querySelectorAll(`input[type="radio"][name="${el.name}"]`);

    radios.forEach((radio) => {
      radio.checked = radio.value === value;
    });

    return;
  }

  if (el.tagName === "SELECT" && el.tomselect) {
    if (el.multiple) {
      el.tomselect.setValue(Array.isArray(value) ? value : [value], true);
    } else {
      el.tomselect.setValue(value, true);
    }
    return;
  }

  el.value = value ?? "";
};
