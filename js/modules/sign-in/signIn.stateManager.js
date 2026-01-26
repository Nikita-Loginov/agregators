import { signInState } from "./signIn.state.js";

export const initFormState = (steps) => {
  steps.forEach((step) => {
    step.form?.items?.forEach((item) => {
      if (!item.typeItem) return;
      signInState.formData[item.typeItem] = item.value ?? "";
    });
  });
};

export const updateFormData = (name, value) => {
  signInState.formData[name] = value;
};

export const getFormData = (name) => signInState.formData[name] ?? "";
