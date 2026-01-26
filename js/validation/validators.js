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
    return !!field.value && field.value.trim() !== "";
  },

  checkbox(field) {
    return field.checked === true;
  },

  match(value, form, fieldName) {
    const target = form.querySelector(`[name="${fieldName}"]`);
    
    return target ? value === target.value : false;
  },
};
