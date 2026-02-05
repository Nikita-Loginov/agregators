// import { allCountries } from "../data/countries.js";

export function initPhoneMasks(form) {
  const inputs = form.querySelectorAll("input[name='tel']");

  if (!window.intlTelInput) {
    console.error("intlTelInput не загружен");
    return;
  }

  const { AsYouType } = window.libphonenumber;

  inputs.forEach((input) => {
    const iti = window.intlTelInput(input, {
      initialCountry: "us",
      separateDialCode: false,
      nationalMode: false,
      autoHideDialCode: false,
      autoPlaceholder: "aggressive",
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
    });

    const wrapper = input.closest(".input-tel-wrapper");

    if (!wrapper) return;

    renderCountryDropdown(wrapper.querySelector(".dropdown__content"), iti);

    input.addEventListener("input", () => {
      const country = iti.getSelectedCountryData().iso2.toUpperCase();
      const formatter = new AsYouType(country);

      input.value = formatter.input(input.value.replace(/[^\d+]/g, ""));
    });

    input._validator = () => {
      const isRequired = input.hasAttribute("required");

      if (!isRequired && !input.value.trim()) {
        return true;
      }

      if (isRequired && !input.value.trim()) {
        return false;
      }

      return iti.isValidNumber();
    };

    const updatePlaceholder = () => {
      const placeholder = input.getAttribute("placeholder");
      input.dataset.placeholder = placeholder;
    };

    input.addEventListener("countrychange", updatePlaceholder);

    updatePlaceholder();
  });
}

const renderCountryDropdown = async (dropdownContent, itiInstance) => {
  dropdownContent.innerHTML = "";

  const { allCountries } = await import("../data/countries.js");
  const box = dropdownContent.closest(".input-box");
  const telInput = box.querySelector("input[name='tel']");

  const searchWrapper = document.createElement("div");
  searchWrapper.className =
    "input-box input-box--little input-box--white iti-search";
  searchWrapper.innerHTML = `
    <label class="input-box__content">
      <div class="input-box__info">
        <input type="text" placeholder="Search country" />
        <div class="icon">
          <span class="kit-icon search-magnifying-glass"></span>
        </div>
      </div>
    </label>
  `;
  dropdownContent.appendChild(searchWrapper);

  const searchInput = searchWrapper.querySelector("input");

  const list = document.createElement("ul");
  list.className = "country-list";

  allCountries.forEach((c) => {
    const li = document.createElement("li");

    li.className = "country-item dropdown-item-close dropdown__item";
    li.dataset.code = c.code.toLowerCase();

    li.innerHTML = `
      <span class="country-item__flag">${c.flag}</span>
      <span class="country-item__name">${c.name}</span>
      <span class="country-item__dial">${c.dialCode}</span>
    `;

    list.appendChild(li);

    li.addEventListener("click", () => {
      list
        .querySelectorAll(".country-item.active")
        .forEach((el) => el.classList.remove("active"));

      li.classList.add("active");

      itiInstance.setCountry(c.code.toLowerCase());

      telInput.focus();
    });
  });

  dropdownContent.appendChild(list);

  searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase().trim();

    Array.from(list.children).forEach((li) => {
      const name = li
        .querySelector(".country-item__name")
        .textContent.toLowerCase();
      const code = li.dataset.code;
      const dial = li.querySelector(".country-item__dial").textContent;

      li.style.display =
        name.includes(val) || code.includes(val) || dial.includes(val)
          ? ""
          : "none";
    });
  });
};
