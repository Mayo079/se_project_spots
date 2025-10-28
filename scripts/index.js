const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn =
  editProfileModal && editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn =
  newPostModal && newPostModal.querySelector(".modal__close-btn");

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
