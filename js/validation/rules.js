export const validationRules = {
  name: {
    required: true,
    minLength: 2,

    message: {
      required: "Введите имя",
      minLength: "Имя должно быть не короче 2 символов",
    },

    hint: "Например: Иван или John",
  },

  tel: {
    required: true,
    type: "phone",

    message: {
      required: "Введите телефон",
      invalid: "Введите корректный номер телефона",
    },

    hint: "Формат номера зависит от выбранной страны",
  },

  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    message: {
      required: "Введите email",
      pattern: "Некорректный email",
    },

    hint: "Пример: user@example.com",
  },

  select: {
    required: true,
    type: "select",

    message: {
      required: "Выберите значение",
    },

    hint: "Выберите один из доступных вариантов",
  },

  policy: {
    required: true,
    type: "checkbox",

    message: {
      required: "Необходимо принять условия",
    },

    hint: "Без этого мы не сможем продолжить",
  },

  message: {
    required: true,

    hint: "Опишите ваш запрос в свободной форме",
  },

  password: {
    required: true,
    minLength: 8,
    maxLength: 32,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  
    message: {
      required: "Введите пароль",
      minLength: "Пароль должен быть не короче 8 символов",
      pattern: "Пароль должен содержать буквы и цифры",
    },
  
    hint: "Минимум 8 символов, включая буквы и цифры",
  },
};
