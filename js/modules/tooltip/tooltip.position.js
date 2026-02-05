const OFFSET = 8;

const POSITIONS = {
  top: {
    space: (spaces) => spaces.top,
    size: (ttRect) => ttRect.height,
    className: "top",
  },
  bottom: {
    space: (spaces) => spaces.bottom,
    size: (ttRect) => ttRect.height,
    className: "bottom",
  },
  left: {
    space: (spaces) => spaces.left,
    size: (ttRect) => ttRect.width,
    className: "left",
  },
  right: {
    space: (spaces) => spaces.right,
    size: (ttRect) => ttRect.width,
    className: "right",
  },
};

export const positionTooltip = (target, tooltip) => {
  const rect = target.getBoundingClientRect();
  const ttRect = tooltip.getBoundingClientRect();

  const spaces = {
    top: rect.top,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
    right: window.innerWidth - rect.right,
  };


  const position = getBestPosition(spaces, ttRect);
  
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

const getBestPosition = (spaces, ttRect) => {
  const entries = Object.entries(POSITIONS);

  const fullyFits = entries.filter(([_, pos]) => {
    return pos.space(spaces) >= pos.size(ttRect) + OFFSET;
  });

  if (fullyFits.length) {
    return fullyFits[0][0];
  }

  return entries.reduce((best, current) => {
    const [, bestPos] = best;
    const [, currPos] = current;

    return currPos.space(spaces) > bestPos.space(spaces) ? current : best;
  })[0];
};
