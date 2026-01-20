import { isFormValid } from "./validate.js";
import { removeAllActiveStarts } from "./rating.js";

const postForm = (target) => {
  const relative = target.closest('[data-block="comment-relative"]');

  const form = relative.querySelector("form.form");

  // ТУТ РЕБЯТ ПИШИТЕ СВОИ ЗАПРОСЫ И СВОЮ ЛОГИКУ РЕНДЕРА ОТЗЫВОВ, Я БУДУ СЧИТАТЬ ЧТО ЕСЛИ ФОРМА ВАЛИДНА ТО СТАТУС УСПЕШНЫЙ И РЕНДЕРЮ ПОКА ЧТО БЛОК С УСПЕШНОСТЬЮ НО ВЫ РЕНДЕРИТЕ В ЗАВИСИМОСТИ ОТ ЗАПРОСА , ФУНКЦИЯ КОТОРАЯ РЕНДЕРИТ СТАТУТСЫ ПРИНИМАЕТ В СЕБЯ STATUS : 'success' | 'error'.КАК И СКАЗАЛ ВЫШЕ, Я ПОКА ЧТО ПЕРЕДАЮ ПРИ ВАЛИДНОСТИ success

  if (isFormValid(form)) {
    showDetails(target, "success");
  }
};

const showFormComments = (target) => {
  const relative = target.closest('[data-block="comment-relative"]');

  relative.classList.add("active-form");
  relative.classList.remove("active-status");
};

const hiddenForm = (target) => {
  const relative = target.closest('[data-block="comment-relative"]');

  relative.classList.remove("active-form");
};

const hiddenStatus = (target) => {
  const relative = target.closest('[data-block="comment-relative"]');

  const statusBox = relative.querySelector('[data-block="comment-status"]');

  statusBox.innerHTML = "";
}

const showDetails = (target, status = "success") => {
  hiddenForm(target);
  hiddenStatus(target);


  const relative = target.closest('[data-block="comment-relative"]');
  relative.classList.add("active-status");

  const statusBox = relative.querySelector('[data-block="comment-status"]');

  if (status === "success") {
    renderStatusSuccess(statusBox);
  } else if (status === "error") {
    renderStatusError(statusBox);
  }

  removeAllActiveStarts(relative)
};

const renderStatusSuccess = (statusBox) => {
  statusBox.insertAdjacentHTML(
    "beforeend",
    `<div class="banner-status banner-status--center success">
                      <div class="banner-status__icon">
                        <span class="icon icon--big">
                          <span class="kit-icon check-big"></span>
                        </span>
                      </div>

                      <div class="banner-status__content">
                        <p class="p1 medium-font">
                          Your comment has been sent successfully.
                        </p>
                      </div>
                    </div>`
  );
};

const renderStatusError = (statusBox) => {
  statusBox.insertAdjacentHTML(
    "beforeend",
    `       <div class="banner-status banner-status--small error">
                      <div class="banner-status__icon">
                        <span class="icon icon--big">
                          <span class="kit-icon close-md"></span>
                        </span>
                      </div>

                      <div class="banner-status__content">
                        <p class="p1 medium-font">Something went wrong.</p>

                        <div class="textbox">
                          <p class="p1">
                            We were unable to process your comment sending due
                            to a technical error. Our team has been notified,
                            and we're working to fix it. Please reload the page
                            and try again.
                          </p>
                        </div>
                      </div>
                    </div>`
  );
};

export const initComments = (e) => {
  const { target } = e;

  if (target.closest('[data-block="comment-btn"]')) {
    showFormComments(target);
  }

  if (target.closest('[data-block="comment-cancel"]')) {
    hiddenForm(target);
  }

  if (target.closest('[data-block="comment-post"]')) {
    postForm(target);
  }
};
