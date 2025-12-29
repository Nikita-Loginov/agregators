export const validators = {
  required(value) {
    return value.trim().length > 0;
  },

  minLength(value, length) {
    return value.trim().length >= length;
  },

  pattern(value, regex) {
    return regex.test(value);
  },

  phone(field) {
    return field._validator ? field._validator() : false;
  },

  select(field) {
    const realSelect = field
      .closest(".custom-select")
      ?.querySelector(".real-select");

    return !!realSelect?.value;
  },
};
