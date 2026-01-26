import { signInState } from "./signIn.state.js";
import { SIGN_IN_CONFIG } from "./signIn.config.js";
import {
  renderHeader,
  renderBody,
  renderFooter,
} from "./signIn.render.js";

export const renderStep = (form) => {
  const steps = SIGN_IN_CONFIG[signInState.type];
  const step = steps[signInState.stepIndex];

  renderHeader(form, step, steps.length + 1);
  renderBody(form, step);
  renderFooter(step.footer, form.querySelector("[data-sign-footer]"));
};
