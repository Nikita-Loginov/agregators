export const SIGN_IN_CONFIG = {
  user: [
    {
      step: 2,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "User",
          href: "/sign-in.html",
        },
      ],
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
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "User",
          href: "/sign-in.html",
        },
      ],
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
    // {
    //   step: 2,
    //   breadcrumbs: ["Home", "Sign up", "Company"],
    //   headerContent: {
    //     head: "Select company type",
    //     text: ["This determines the features available to your account"],
    //   },
    //   form: {
    //     items: [
    //       {
    //         type: "radio",
    //         typeInput: "radio",
    //         name: "company",
    //         typeItem: "agency",
    //         title: "Agency",
    //         text: "Real estate agency or brokerage",
    //         value: "",
    //       },
    //       {
    //         type: "radio",
    //         typeInput: "radio",
    //         name: "company",
    //         typeItem: "developer",
    //         title: "Developer",
    //         text: "Property developer or builder",
    //         value: "",
    //       },
    //     ],
    //     important: {
    //       title: "Important: You can't change your company type later",
    //       text: ["I understand that my choice of Agency is permanent and cannot be changed after account creation"],
    //       icon : "wavy-warning",
    //       value: "",
    //     }
    //   },
    //   footer: {
    //     policy: false,
    //     policyValue: false,
    //     detais: {
    //       showed: false,
    //       social: false,
    //     },
    //   },
    // },
    {
      step: 2,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Company",
          href: "/sign-in.html",
        },
        {
          name: "Agency",
          href: "/sign-in.html",
        },
      ],
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
    // {
    //   step: 3,
    //   breadcrumbs: ["Home", "Sign up", "Company", "Agency"],
    //   headerContent: {
    //     head: "Account password",
    //     text: ["Set up your login credentials"],
    //   },
    //   form: {
    //     items: [
    //       {
    //         type: "input",
    //         head: "Password",
    //         typeInput: "password",
    //         typeItem: "password",
    //         placeholder: "Create strong password",
    //         value: "",
    //         state: true,
    //       },
    //       {
    //         type: "input",
    //         head: "Confirm password",
    //         typeInput: "password",
    //         typeItem: "passwordConfirm",
    //         placeholder: "Re-enter your password",
    //         value: "",
    //       },
    //     ],
    //   },
    //   footer: {
    //     policy: true,
    //     policyValue: "",
    //     detais: {
    //       showed: false,
    //       social: false,
    //     },
    //   },
    // },
    {
      step: 3,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Company",
          href: "/sign-in.html",
        },
        {
          name: "Agency",
          href: "/sign-in.html",
        },
      ],
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
        closeBtn: false,
      },
    },
  ],
  specialist: [
    {
      step: 2,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Specialist",
          href: "/sign-in.html",
        },
      ],
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
            bigInput: true,
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
        policy: true,
        policyValue: "",
        detais: {
          showed: false,
          social: false,
        },
      },
    },
    {
      step: 3,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Specialist",
          href: "/sign-in.html",
        },
      ],
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
  resetPassword: [
    {
      step: 2,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Reset password",
          href: "/forgot.html",
        },
      ],
      headerContent: {
        head: "Almost there!",
        text: ["An email has been successfully sent to your email address."],
      },
      content: {
        head: "Check the email address you provided. ",
        text: ["Follow the instructions in the email to reset your password."],
      },
      footer: {
        showed: true,
        closeBtn: true,
      },
    },
  ],
  createPassword: [
    {
      step: 2,
      breadcrumbs: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Sign up",
          href: "/sign-in.html",
        },
        {
          name: "Create new password",
          href: "/create-password.html",
        },
      ],
      headerContent: {
        head: "Done!",
      },
      content: {
        head: "A new password for your account has been successfully set.",
      },
      footer: {
        showed: true,
        closeBtn: false,
        detais: {
          modal: {
            text: "Login",
            modalName: "loginModal",
            icon: ' <div class="icon" style="rotate: -45deg"><span class="kit-icon arrow-right-md"></span></div>',
          },
        },
      },
    },
  ],
};
