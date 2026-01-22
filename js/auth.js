import { resetPasswordInit } from "./modules/resetPassword.js";

const handleGlobalEvents = (e) => {
  resetPasswordInit(e);
};

document.addEventListener("click", () => {
  document.addEventListener("click", handleGlobalEvents);
});
