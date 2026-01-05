const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal?.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal?.querySelector(
  "#profile-description-input"
);
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const titleInput = newPostModal.querySelector("#card-description-input");
const imageInput = newPostModal.querySelector("#card-image-input");

const OPEN_CLASS = "is-opened";

function openModal(modal, opener) {
  if (!modal) return;

  if (modal === editProfileModal) {
    if (editProfileNameInput)
      editProfileNameInput.value = profileNameEl?.textContent || "";
    if (editProfileDescriptionInput)
      editProfileDescriptionInput.value =
        profileDescriptionEl?.textContent || "";
  }
  const form = modal.querySelector(".modal__form");
  if (form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    const state = {};
    inputs.forEach((inp) => {
      if (inp.name) state[inp.name] = inp.value;
    });
    modal._initialFormState = state;
  }

  modal._lastOpener = opener || null;
  modal.classList.add(OPEN_CLASS);
  const firstControl = modal.querySelector(
    ".modal__form input, .modal__form textarea, .modal__form select"
  );
  if (firstControl) firstControl.focus();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove(OPEN_CLASS);
}

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-modal]");
  if (!opener) return;
  const modalId = opener.dataset.modal;
  if (!modalId) return;
  const modal = document.getElementById(modalId);
  if (!modal) return;
  openModal(modal, opener);
});

if (editProfileBtn && !editProfileBtn.hasAttribute("data-modal")) {
  editProfileBtn.addEventListener("click", () =>
    openModal(editProfileModal, editProfileBtn)
  );
}

if (newPostBtn && newPostModal && !newPostBtn.hasAttribute("data-modal")) {
  newPostBtn.addEventListener("click", () =>
    openModal(newPostModal, newPostBtn)
  );
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".modal__close-btn");
  if (!btn) return;
  const modal = btn.closest(".modal");
  if (!modal) return;
  restoreOrResetForm(modal);
  closeModal(modal);
  if (modal._lastOpener) modal._lastOpener.focus();
});

function restoreOrResetForm(modal) {
  if (!modal) return;
  const form = modal.querySelector(".modal__form");
  if (!form) return;
  if (modal._initialFormState) {
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((inp) => {
      if (
        inp.name &&
        Object.prototype.hasOwnProperty.call(modal._initialFormState, inp.name)
      ) {
        inp.value = modal._initialFormState[inp.name];
      }
    });
  } else {
    form.reset();
  }
}

document.addEventListener("keydown", (event) => {
  const modal = document.querySelector(`.modal.${OPEN_CLASS}`);
  if (!modal) return;

  if (event.key === "Escape" || event.key === "Esc") {
    event.preventDefault();
    restoreOrResetForm(modal);
    closeModal(modal);
    if (modal._lastOpener) modal._lastOpener.focus();
    return;
  }

  if (event.key === "Tab") {
    const focusableSelectors =
      'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    const focusable = Array.from(
      modal.querySelectorAll(focusableSelectors)
    ).filter(
      (el) =>
        el.offsetWidth > 0 ||
        el.offsetHeight > 0 ||
        el === document.activeElement
    );

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (
        document.activeElement === first ||
        !modal.contains(document.activeElement)
      ) {
        last.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  }
});

if (editProfileModal) {
  editProfileModal
    .querySelector(".modal__form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      profileNameEl.textContent = editProfileNameInput.value;
      profileDescriptionEl.textContent = editProfileDescriptionInput.value;
      delete editProfileModal._initialFormState;
      closeModal(editProfileModal);
      editProfileModal._lastOpener?.focus();
    });
}

if (newPostModal) {
  const newPostForm = newPostModal.querySelector(".modal__form");
  if (newPostForm) {
    newPostForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const title = titleInput && titleInput.value.trim();
      const imageUrl = imageInput && imageInput.value.trim();

      if (!imageUrl) {
        alert("Please provide an image URL for the new post.");
        return;
      }

      const list = document.querySelector(".cards__list");
      if (!list) return;

      const li = document.createElement("li");
      li.className = "card";

      const imgEl = document.createElement("img");
      imgEl.className = "card__image";
      imgEl.src = imageUrl;
      imgEl.alt = title || "New post";

      const contentDiv = document.createElement("div");
      contentDiv.className = "card__content";

      const h2 = document.createElement("h2");
      h2.className = "card__title";
      h2.textContent = title || "New post";

      const likeBtn = document.createElement("button");
      likeBtn.type = "button";
      likeBtn.className = "card__like-btn";

      contentDiv.appendChild(h2);
      contentDiv.appendChild(likeBtn);

      li.appendChild(imgEl);
      li.appendChild(contentDiv);

      list.prepend(li);
      delete newPostModal._initialFormState;
      closeModal(newPostModal);
      newPostForm.reset();
      newPostModal._lastOpener?.focus();
    });
  }
}
