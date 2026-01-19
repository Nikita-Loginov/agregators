const OFFSET = 8;

export const positionTooltip = (target, tooltip) => {
  const rect = target.getBoundingClientRect();
  const ttRect = tooltip.getBoundingClientRect();

  const spaces = {
    top: rect.top,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
    right: window.innerWidth - rect.right,
  };

  let position = "top";

  if (spaces.top >= ttRect.height + OFFSET) position = "top";
  else if (spaces.bottom >= ttRect.height + OFFSET) position = "bottom";
  else if (spaces.right >= ttRect.width + OFFSET) position = "right";
  else if (spaces.left >= ttRect.width + OFFSET) position = "left";

  tooltip.classList.remove("top", "bottom", "left", "right");
  tooltip.classList.add(position);

  let top = 0;
  let left = 0;

  switch (position) {
    case "top":
      top = rect.top - OFFSET;
      left = rect.left + rect.width / 2;
      break;
    case "bottom":
      top = rect.bottom + OFFSET;
      left = rect.left + rect.width / 2;
      break;
    case "left":
      top = rect.top + rect.height / 2;
      left = rect.left - OFFSET;
      break;
    case "right":
      top = rect.top + rect.height / 2;
      left = rect.right + OFFSET;
      break;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
};
