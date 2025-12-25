export const handleNumberInput = (input) => {
  if (input.value.trim() === "") return;

  const min = parseFloat(input.getAttribute("min"));
  const max = parseFloat(input.getAttribute("max"));
  const value = parseFloat(input.value);

  if (!isNaN(min) && value < min) {
    input.value = min;
  } else if (!isNaN(max) && value > max) {
    input.value = max;
  }
};
