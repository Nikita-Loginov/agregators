import { tooltipState } from "./tooltip.state.js";
import {
  createTooltip,
  removeTooltip,
  getTooltipText,
  removeNativeTitle,
  restoreNativeTitle,
} from "./tooltip.dom.js";
import { positionTooltip } from "./tooltip.position.js";
import { isTouchDevice } from "../functions.js";

const showTooltip = (target) => {
  const text = getTooltipText(target);
  if (!text) return;

  removeTooltip();
  removeNativeTitle(target);

  const el = createTooltip(text);

  tooltipState.tooltipEl = el;
  tooltipState.activeTarget = target;

  requestAnimationFrame(() => {
    positionTooltip(target, el);
    el.classList.add("visible");
  });
};

const handleMouseOver = (e) => {
  if (isTouchDevice()) return;

  const target = e.target.closest("[title], [data-tooltip]");
  if (!target || target === tooltipState.activeTarget) return;

  showTooltip(target);
};

const handleMouseOut = (e) => {
  const { activeTarget } = tooltipState;
  if (!activeTarget) return;
  if (activeTarget.contains(e.relatedTarget)) return;

  restoreNativeTitle(activeTarget);
  removeTooltip();
};

export const initTooltip = () => {
  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  // window.addEventListener("scroll", removeTooltip);
  window.addEventListener("resize", removeTooltip);
};
