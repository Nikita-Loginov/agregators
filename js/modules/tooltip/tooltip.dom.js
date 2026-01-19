import { tooltipState } from "./tooltip.state.js";

export const createTooltip = (text) => {
  const el = document.createElement("div");
  el.className = "tooltip";

  const p = document.createElement("p");
  p.className = "p3";
  p.textContent = text;

  el.appendChild(p);
  document.body.appendChild(el);

  return el;
};

export const removeTooltip = () => {
  if (!tooltipState.tooltipEl) return;

  tooltipState.tooltipEl.remove();
  tooltipState.tooltipEl = null;
  tooltipState.activeTarget = null;
};

export const getTooltipText = (el) =>
  el.dataset.tooltip || el.getAttribute("title");

export const removeNativeTitle = (el) => {
  if (!el.hasAttribute("title")) return;

  el.dataset.nativeTitle = el.getAttribute("title");
  el.removeAttribute("title");
};

export const restoreNativeTitle = (el) => {
  if (!el?.dataset.nativeTitle) return;

  el.setAttribute("title", el.dataset.nativeTitle);
  delete el.dataset.nativeTitle;
};
