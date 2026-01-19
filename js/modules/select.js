import { closeAllDropdowns } from "./dropdown.js";
import { hiddenLoader } from "./loader.js";

const collectOptionsData = (select) => {
  const groups = {};
  const optionsData = [];

  Array.from(select.options).forEach((option) => {
    const group = option.getAttribute("data-group");
    const value = option.value;
    const text = option.textContent;

    if (value) {
      if (group) {
        if (!groups[group]) {
          groups[group] = {
            label:
              option.getAttribute("data-group-title") ||
              group.charAt(0).toUpperCase() + group.slice(1),
            options: [],
          };
        }
        groups[group].options.push({ value, text });
      } else {
        optionsData.push({ value, text });
      }
    }
  });

  return { groups, optionsData };
};

const prepareTomSelectOptions = (groups, optionsData) => {
  const allOptions = [...optionsData];
  const optgroups = [];

  Object.keys(groups).forEach((groupName) => {
    optgroups.push({
      value: groupName,
      label: groups[groupName].label,
    });

    groups[groupName].options.forEach((opt) => {
      allOptions.push({
        ...opt,
        optgroup: groupName,
      });
    });
  });

  return { allOptions, optgroups };
};

const createItemRenderer = (isMultiple, hasCheckboxes) => (data, escape) =>
  `
  <div class="ts-item" data-value="${escape(data.value)}">
    ${escape(data.text)}
    ${
      isMultiple && !hasCheckboxes
        ? '<button class="ts-item-remove" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12" stroke="#636899" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
        : ""
    }
  </div>
`;

const createOptionRenderer =
  (select, isMultiple, hasCheckboxes) => (data, escape) => {
    const originalOption = select.querySelector(
      `option[value="${data.value}"]`
    );
    const type = originalOption
      ? originalOption.getAttribute("data-type")
      : null;
    const tag = originalOption ? originalOption.getAttribute("data-tag") : null;
    const desc = originalOption
      ? originalOption.getAttribute("data-desc")
      : null;

    if (hasCheckboxes) {
      return `
      <div class="ts-option check-without-input" data-value="${escape(
        data.value
      )}">
        <div class="check-without-input__check"></div>
        <div class="check-without-input__content">${escape(data.text)}</div>
      </div>
    `;
    }

    if (type && type === "city") {
      return `
      <div class="ts-option city-option" data-value="${escape(data.value)}">
        <div class="city-item">
          <div class="city-item__header">
            <p class="p2">${escape(data.text)}</p>
            <p class="p4">${tag ? escape(tag) : "City"}</p>
          </div>
          <div class="city-item__footer">
            <p class="p4">${desc ? escape(desc) : ""}</p>
          </div>
        </div>

        ${
          isMultiple
            ? '<button class="ts-option-remove" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12" stroke="#636899" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
            : ""
        }
      </div>
    `;
    }

    return `
    <div class="ts-option" data-value="${escape(data.value)}">
      <span>${escape(data.text)}</span>
      ${
        isMultiple
          ? '<button class="ts-option-remove" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 12L8.00001 8.00001M8.00001 8.00001L4 4M8.00001 8.00001L12 4M8.00001 8.00001L4 12" stroke="#636899" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
          : ""
      }
    </div>
  `;
  };

const createOptgroupHeaderRenderer = () => (data, escape) =>
  `<div class="ts-optgroup-header p2 semibold-font">${escape(
    data.label
  )}</div>`;

const setupCheckboxHandlers = (self, hasCheckboxes, updateCounter) => {
  if (!hasCheckboxes) return;

  const handleCheckboxClick = (e) => {
    const optionEl = e.target.closest(".check-without-input");

    if (optionEl) {
      const value = optionEl.getAttribute("data-value");
      const isCurrentlySelected = optionEl.classList.contains("cheched");

      if (isCurrentlySelected) {
        self.removeItem(value, true);
        optionEl.classList.remove("cheched");
      } else {
        self.addItem(value);
        optionEl.classList.add("cheched");
      }

      if (typeof updateCounter === "function") {
        updateCounter();
      }

      return false;
    }
  };

  self.on("dropdown_open", function () {
    if (this.dropdown) {
      this.dropdown.addEventListener("click", handleCheckboxClick);
      this.checkboxHandler = handleCheckboxClick;
    }
  });
};

const setupMultipleSelectHandlers = (
  self,
  isMultiple,
  select,
  updateCounter
) => {
  if (!isMultiple) return;

  self.dropdown_content?.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".ts-option-remove");

    if (removeBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const optionEl = removeBtn.closest(".ts-option");
      if (!optionEl) return;

      const value = optionEl.getAttribute("data-value");

      setTimeout(() => {
        self.removeItem(value, true);
        updateCounter();
      }, 0);

      return false;
    }
  });

  self.control?.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".ts-item-remove");

    if (removeBtn) {
      e.preventDefault();
      e.stopPropagation();

      const itemEl = removeBtn.closest(".ts-item");
      if (!itemEl) return;
      const value = itemEl.getAttribute("data-value");

      self.removeItem(value, true);

      if (self.isOpen) {
        self.refreshOptions();

        const searchInput = self.dropdown?.querySelector(
          ".ts-dropdown-content input"
        );
        if (searchInput) {
          searchInput.focus();
        }
      }

      return false;
    } else if (e.target.classList.contains("ts-item")) {
      if (self.isOpen) self.close();
      else self.open();
    }
  });
};

const createUpdateCounter = (self, hasWordsClass) => () => {
  const container = self.control;
  if (!container) return;

  const items = container.querySelectorAll(".ts-item");
  let used = 0;
  let hidden = 0;
  const available = container.clientWidth;

  items.forEach((item) => {
    item.style.display = "inline-flex";
    const w = item.offsetWidth;

    if (used + w + 90 > available) {
      item.style.display = "none";
      hidden++;
    } else {
      used += w;
    }
  });

  let counter = container.querySelector(".ts-counter");
  if (counter) counter.remove();

  if (hidden > 0) {
    counter = document.createElement("div");
    counter.className = "ts-counter";
    counter.textContent = hasWordsClass ? "..." : `+${hidden}`;
    container.appendChild(counter);
  }
};

const setupEventListeners = (self, isMultiple, hasWordsClass) => {
  if (!isMultiple) return;

  const updateCounter = createUpdateCounter(self, hasWordsClass);

  self.on("change", updateCounter);
  self.on("clear", () => {
    updateCounter();
    if (self.isOpen) self.refreshOptions();
  });

  self.on("item_remove", () => {
    setTimeout(() => {
      updateCounter();
      if (self.isOpen) self.refreshOptions();
    }, 0);
  });

  if (self.control) {
    const ro = new ResizeObserver(updateCounter);
    ro.observe(self.control);
    self.resizeObserver = ro;
  }

  return updateCounter;
};

export const initSelects = () => {
  document.querySelectorAll("select").forEach((select) => {
    const isMultiple = select.hasAttribute("multiple");
    const hasSearch = select.hasAttribute("data-search");
    const hasCheckboxes = select.closest(".select-box--check") !== null;
    const hasWordsClass = select.closest(".select-box--words") !== null;
    const dropdownTarget = select.hasAttribute("data-dropdown-outside")
      ? "body"
      : null;

    const { groups, optionsData } = collectOptionsData(select);
    const { allOptions, optgroups } = prepareTomSelectOptions(
      groups,
      optionsData
    );

    const renderFunctions = {
      item: createItemRenderer(isMultiple, hasCheckboxes),
      option: createOptionRenderer(select, isMultiple, hasCheckboxes),
      optgroup_header: createOptgroupHeaderRenderer(),
      option_create: (data, escape) =>
        `<div class="create">Добавить <strong>${escape(
          data.input
        )}</strong>&hellip;</div>`,
      no_results: (data, escape) =>
        `<div class="no-results">Не найдено "${escape(data.input)}"</div>`,
    };

    const plugins = hasSearch ? { dropdown_input: {} } : {};
    if (optgroups.length > 0) {
      plugins.optgroup_columns = { equalWidth: true };
    }

    hiddenLoader(select);

    const ts = new TomSelect(select, {
      maxItems: isMultiple ? null : 1,
      persist: true,
      create: false,
      searchField: hasSearch ? ["text"] : false,
      hideSelected: false,
      dropdownParent: dropdownTarget,
      plugins,
      optgroups,
      options: allOptions,
      closeAfterSelect: false,
      render: renderFunctions,
      onInitialize: function () {
        const self = this;

        const findAndDisableInput = () => {
          const tsControl = self.control;

          if (tsControl) {
            const input = tsControl.querySelector("input");

            input.setAttribute("readonly", "true");
          }
        };

        setTimeout(findAndDisableInput, 0);
        setTimeout(findAndDisableInput, 100);

        const updateCounter = setupEventListeners(
          self,
          isMultiple,
          hasWordsClass
        );
        setupCheckboxHandlers(self, hasCheckboxes, updateCounter);
        setupMultipleSelectHandlers(self, isMultiple, select, updateCounter);

        self.on("dropdown_open", function () {
          closeAllDropdowns();
        });

        if (updateCounter) {
          setTimeout(updateCounter, 0);
        }
      },
      onItemAdd: function () {
        if (!isMultiple && this.isOpen) {
          setTimeout(() => this.close(), 100);
        }
      },
      onDropdownOpen: function () {
        const searchInput = this.dropdown?.querySelector("input");
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      },
      onDropdownClose: function () {
        // if (dropdownTarget === "body" && this.dropdown && !this.isOpen) {
        // }
      },
      onDestroy: function () {
        if (this.resizeObserver && this.control) {
          this.resizeObserver.unobserve(this.control);
        }
        if (this.checkboxHandler && this.dropdown) {
          this.dropdown.removeEventListener("click", this.checkboxHandler);
        }
      },
    });
  });
};
