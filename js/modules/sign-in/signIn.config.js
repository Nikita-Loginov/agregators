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
          {
            type: "input",
            head: "Password",
            typeInput: "password",
            typeItem: "password",
            placeholder: "Create strong password",
            value: "",
            state: true,
          },
          {
            type: "input",
            head: "Confirm password",
            typeInput: "password",
            typeItem: "passwordConfirm",
            placeholder: "Re-enter your password",
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
  company: [
    {
      step: 2,
      headerContent: {
        head: "Select company type",
        text: ["This determines the features available to your account"],
      },
      form: {
        items: [
          {
            type: "radio",
            typeInput: "radio",
            name: "company",
            typeItem: "agency",
            title: "Agency",
            text: "Real estate agency or brokerage",
            value: "",
          },
          {
            type: "radio",
            typeInput: "radio",
            name: "company",
            typeItem: "developer",
            title: "Developer",
            text: "Property developer or builder",
            value: "",
          },
        ],
      },
      footer: {
        policy: false,
        policyValue: false,
        detais: {
          showed: false,
          social: false,
        },
      },
    },
    {
      step: 3,
      headerContent: {
        head: "Account info",
        text: ["Set up your login credentials"],
      },
      form: {
        items: [
          {
            type: "input",
            head: "Company name",
            typeInput: "text",
            typeItem: "companyName",
            placeholder: "ex. Umbrella Corp.",
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
          {
            type: "input",
            head: "Contact person",
            typeInput: "text",
            typeItem: "contactPerson",
            placeholder: "ex. Jeffrey Dahmer",
            value: "",
          },
          {
            type: "input",
            head: "Contact phone number",
            typeInput: "tel",
            typeItem: "tel",
            placeholder: "",
            value: "",
          },
        ],
      },
      footer: {
        policy: false,
        policyValue: false,
        detais: {
          showed: false,
          social: false,
        },
      },
    },
    {
      step: 4,
      headerContent: {
        head: "Account password",
        text: ["Set up your login credentials"],
      },
      form: {
        items: [
          {
            type: "input",
            head: "Password",
            typeInput: "password",
            typeItem: "password",
            placeholder: "Create strong password",
            value: "",
            state: true,
          },
          {
            type: "input",
            head: "Confirm password",
            typeInput: "password",
            typeItem: "passwordConfirm",
            placeholder: "Re-enter your password",
            value: "",
          },
        ],
      },
      footer: {
        policy: true,
        policyValue: "",
        detais: {
          showed: false,
          social: false,
        },
      },
    },
    {
      step: 5,
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
  specialist: [
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
          {
            type: "input",
            head: "Contact phone number",
            typeInput: "tel",
            typeItem: "tel",
            placeholder: "",
            value: "",
          },
          {
            type: "input",
            head: "Password",
            typeInput: "password",
            typeItem: "password",
            placeholder: "Create strong password",
            value: "",
            state: true,
          },
          {
            type: "input",
            head: "Confirm password",
            typeInput: "password",
            typeItem: "passwordConfirm",
            placeholder: "Re-enter your password",
            value: "",
          },
        ],
      },
      footer: {
        policy: false,
        policyValue: false,
        detais: {
          showed: false,
          social: false,
        },
      },
    },
    {
      step: 3,
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
