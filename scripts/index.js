const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const cardTemplate = document.querySelector("#card-template");
const cardlist = document.querySelector(".cards__list"); //.append(cardElement);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardlist.append(cardElement);
});

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", function () {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModalEl);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", handleEscapeClose);
  modal.addEventListener("click", handleOverlayClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", handleEscapeClose);
  modal.removeEventListener("click", handleOverlayClose);
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["profile-form"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = document.forms["new-post-modal-form"];
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostTitleInput = newPostModal.querySelector("#card-description-input");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const previewModalEl = document.querySelector("#preview-modal");
const previewImageEl = previewModalEl.querySelector(".modal__image");
const previewCaptionEl = previewModalEl.querySelector(".modal__caption");
const previewModalCloseBtnEl =
  previewModalEl.querySelector(".modal__close-btn");

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__add-btn");

document
  .querySelector("#edit-profile-modal .modal__close-btn")
  .addEventListener("click", function () {
    resetValidation(editProfileForm, settings);
    editProfileNameInput.value = profileNameEL.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    closeModal(editProfileModal);
  });

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
    resetValidation(editProfileForm, settings);
  }
}

editProfileBtn.addEventListener("click", function () {
  openEditProfileModal();
});

const previewModalCloseBtn = previewModalEl.querySelector(
  ".modal__close-btn_type_preview"
);
previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModalEl);
});

function resetValidation(form, settings) {
  const errorElements = form.querySelectorAll(settings.errorClass);
  console.log(errorElements);
  errorElements.forEach((el) => el.remove());

  const inputs = Array.from(form.querySelectorAll("input, select, textarea,span"));
  console.log(inputs); console.log(settings);
  inputs.forEach((input) => {
    input.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputErrorClass);
  });

  if (settings && settings.validationErrors) {
    settings.validationErrors = {};
  }
}

newPostModal.addEventListener("click", function (e) {
  if (e.target === newPostModal) {
    closeModal(newPostModal);
  }
});

const openNewPostModal = () => {
  newPostModal.classList.add("modal_is-opened");
  validation.disableButton(newPostSubmitBtn, settings);
};

newPostBtn.addEventListener("click", function () {
  openNewPostModal();
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: newPostTitleInput.value,
    link: newPostLinkInput.value,
  };

  function handleNewPostSubmit() {
    const inputValues = {
      name: newPostTitleInput.value,
      link: newPostLinkInput.value,
    };
    validation.disableButton(buttonElement, validation.settings);
  }

  const cardElement = getCardElement(inputValues);
  cardlist.prepend(cardElement);
  evt.target.reset();
  validation.disableButton(newPostSubmitBtn, settings);
  closeModal(newPostModal);
}

function handleOpenEditProfileModal() {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
}

function handleEditProfileClose() {
  resetValidation(editProfileForm, settings);
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  closeModal(editProfileModal);
}

function openEditProfileModal() {
  openModal(editProfileModal);
  handleOpenEditProfileModal(editProfileForm, settings);
  document
    .querySelector("#edit-profile-modal .modal__close-btn")
    .addEventListener("click", handleEditProfileClose);
}

function closeEditProfileModal() {
  document
    .querySelector("#edit-profile-modal .modal__close-btn")
    .removeEventListener("click", handleEditProfileClose);
  closeModal(editProfileModal);
}
