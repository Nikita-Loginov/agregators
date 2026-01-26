const strengthRules = {
  length: (v) => v.length >= 8,
  digit: (v) => /\d/.test(v),
  letter: (v) => /[A-Za-z]/.test(v),
};

export const getPasswordStrength = (value) => {
  const checks = {
    length: strengthRules.length(value),
    digit: strengthRules.digit(value),
    letter: strengthRules.letter(value),
  };

  const passed = Object.values(checks).filter(Boolean).length;

  let level = "weak";
  if (passed === 2) level = "medium";
  if (passed === 3) level = "strong";

  return { level, checks, passed };
};

export const initPasswordStrength = (formItem) => {
  const input = formItem.querySelector('input[type="password"]');
  const states = formItem.querySelector(".input-box__states");
  if (!input || !states) return;

  const statusText = states.querySelector(".input-box__states-status");
  const progressLine = states.querySelector(".input-box__states-line > div");
  const box = formItem;

  const items = {
    length: states.querySelectorAll(".input-box__states-item")[0],
    digit: states.querySelectorAll(".input-box__states-item")[1],
    letter: states.querySelectorAll(".input-box__states-item")[2],
  };

  input.addEventListener("input", () => {
    const value = input.value;
    const { level, checks, passed } = getPasswordStrength(value);

    box.classList.remove("weak", "medium", "strong");
    box.classList.add(level);

    statusText.textContent =
      level === "strong" ? "Strong" : level === "medium" ? "Medium" : "Weak";

    progressLine.style.width = `${(passed / 3) * 100}%`;

    Object.entries(checks).forEach(([key, valid]) => {
      items[key]?.classList.toggle("success", valid);
    });

    input.setAttribute("aria-invalid", String(level === "weak"));
  });
};
