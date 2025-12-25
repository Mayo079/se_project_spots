const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal && editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn =
  newPostModal && newPostModal.querySelector(".modal__close-btn");
const profileNameI = document.querySelector(".profile__name");
const profileDescriptionI = document.querySelector(".profile__description");
const cardTitleI = document.querySelector(".card__title");
const cardImageI = document.querySelector(".card__image");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

if (editProfileBtn && editProfileModal) {
  editProfileBtn.addEventListener("click", function () {
    editProfileModal.classList.add("is-opened");
  });
}

if (editProfileCloseBtn && editProfileModal) {
  editProfileCloseBtn.addEventListener("click", function () {
    editProfileModal.classList.remove("is-opened");
  });
}

document.querySelectorAll(".modal__close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (modal) modal.classList.remove("is-opened");
  });
});

if (newPostBtn && newPostModal) {
  newPostBtn.addEventListener("click", function () {
    newPostModal.classList.add("is-opened");
  });
}

if (newPostCloseBtn && newPostModal) {
  newPostCloseBtn.addEventListener("click", function () {
    newPostModal.classList.remove("is-opened");
  });
}

if (editProfileModal) {
  editProfileModal
    .querySelector(".modal__form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      profileNameI.textContent = editProfileNameInput.value;
      profileDescriptionI.textContent = editProfileDescriptionInput.value;
      editProfileModal.classList.remove("is-opened");
    });
}

if (newPostModal) {
  const newPostForm = newPostModal.querySelector(".modal__form");
  if (newPostForm) {
    newPostForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const titleInput = newPostModal.querySelector("#card-description-input");
      const imageInput = newPostModal.querySelector("#card-image-input");
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
      li.innerHTML = `
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(
        title || "New post"
      )}" class="card__image" />
        <div class="card__content">
          <h2 class="card__title">${escapeHtml(title || "New post")}</h2>
          <button type="button" class="card__like-btn"></button>
        </div>
      `;

      list.prepend(li);

      newPostModal.classList.remove("is-opened");
      newPostForm.reset();
    });
  }
}
