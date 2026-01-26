export const SIGN_IN_CONFIG = {
  user: [
    {
      step: 2,
      headerContent: {
        head: "Account & Security",
        text: ["Set up your login credentials"],
      },
      form: {
        items: [
          {
            type: "input",
            head: "Name",
            typeInput: "text",
            typeItem: "name",
            placeholder: "ex. Jeffrey Dahmer",
            value: "",
          },
          {
            type: "input",
            head: "Email",
            typeInput: "email",
            typeItem: "email",
            placeholder: "your@email.com",
            value: "",
          },
        ],
      },
      footer: {
        policy: true,
        policyValue: false,
        detais: {
          showed: true,
          social: true,
        },
      },
    },
    {
      step: 3,
      headerContent: {
        head: "Account & Security",
        text: ["Set up your login credentials"],
      },
      form: {
        items: [
          
          {
            type: "input",
            head: "lastName",
            typeInput: "text",
            typeItem: "lastName",
            placeholder: "ex. Jeffrey Dahmer",
            value: "",
          },
        ],
      },
      footer: {
        policy: true,
        policyValue: false,
        detais: {
          showed: true,
          social: true,
        },
      },
    },
    {
      step: 4,
      headerContent: {
        head: "Account Created",
        text: ["Your account has been successfully created."],
      },
      content: {
        head: "Check the email address you provided during registration.",
        text: [
          "Follow the instructions in the email to activate your account.",
        ],
      },
      footer: {
        showed: true,
        closeBtn: true,
      },
    },
  ],
};
