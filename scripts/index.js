const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#newPostCard-Link-Input");
const newPostTitleInput = newPostModal.querySelector("#card-description-input");

const profileNameEL = document.querySelector(".profile__name");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostDescriptionEL = document.querySelector("#card-description-input");

editProfileCloseBtn.addEventListener("click", function () {
  // editProfileNameInput.value = profileNameEL.textContent;
  // editProfileDescriptionInput.value = profileDescriptionEL.textContent:
  editProfileModal.classList.remove("modal_is-opened");
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  // newPostLinkInput.value = newPostCloseBtn.textContent;
  // newPostDescriptionInput.value = newPostDescriptionEL.textContent;
  newPostModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  newPostModal.classList.remove("modal_is-opened");
}
