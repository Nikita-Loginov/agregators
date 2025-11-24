let activeDropdowns = [];

export const toggleDropdown = (e) => {
  const { target } = e;

  if (target.closest(".dropdown__toggle")) {
    const dropdown = target.closest(".dropdown");

    activeDropdowns.forEach((item) => {
      if (item !== dropdown) item.classList.remove("active");
    });

    dropdown.classList.toggle("active");

    activeDropdowns = dropdown.classList.contains("active")
      ? [dropdown]
      : activeDropdowns.filter((item) => item !== dropdown);

    return;
  }

  if (target.closest(".dropdown-item-close")) {
    const dropdown = target.closest(".dropdown");

    if (dropdown) {
      dropdown.classList.remove("active");
      activeDropdowns = activeDropdowns.filter((item) => item !== dropdown);
    }

    if (dropdown.classList.contains('dropdown--select')) {
      toggleSelectText(dropdown, target)
    }
    
    return;
  }

  if (!target.closest(".dropdown") && activeDropdowns.length > 0) {
    activeDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });

    activeDropdowns = [];
  }
};

const toggleSelectText = (dropdown, item) => {
  const activeBox = dropdown.querySelector('.dropdown__active');

  if (activeBox) {
    const itemBox = item.closest('.dropdown__link');
    const linkBox = itemBox.querySelector('.dropdown__item')

    if (!linkBox) return;

    const text =linkBox.textContent.trim();

    const links = dropdown.querySelectorAll('.dropdown__item');

    links.forEach((link) => {
      link.classList.remove('active')
    })

    linkBox.classList.add('active')

    activeBox.textContent = text
  }
}

export const firstActiveText = () => {
  const dropdownSelects = document.querySelectorAll(".dropdown.dropdown--select");

  dropdownSelects.forEach((dropdow) => {
    const dropdownLinkActive = dropdow.querySelector('.dropdown__item.active') || dropdow.querySelectorAll('.dropdown__item')[0];
    const text = dropdownLinkActive.textContent.trim();

    const activeBox = dropdow.querySelector('.dropdown__active');



    activeBox.textContent = text;
  })
}
