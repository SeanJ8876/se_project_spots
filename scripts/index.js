const initialCards = [
  {
    name: " Golden Gate Bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
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
const cardElement = cardTemplate.querySelector(".card"); // misssing delcration
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
    openModal(previewModal);
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

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

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

editProfileCloseBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  closeModal(editProfileModal);
  resetValidation(
    [editProfileNameInput, editProfileDescriptionInput],
    editProfileForm
  );
});

const previewModalCloseBtn = previewModalEl.querySelector(
  ".modal__close-btn_type_preview"
);
previewModalCloseBtn.addEventListener("click", function () {
  previewModalEl.classList.remove("modal_is-opened");
  closeModal(previewModalEl);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  // editProfileModal.classList.add("modal_is-opened");
  resetValidation(
    [editProfileNameInput, editProfileDescriptionInput],
    editProfileForm
  );
  openModal(editProfileModal);
});

newPostCloseBtn.addEventListener("click", function () {
  // newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
});

newPostBtn.addEventListener("click", function () {
  // newPostModal.classList.add("modal_is-opened");
  resetValidation([newPostLinkInput, newPostTitleInput], newPostForm);
  openModal(newPostModal);
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
  const cardElement = getCardElement(inputValues);
  cardlist.prepend(cardElement);
  evt.target.reset();
  disableButton(newPostSubmitBtn, settings);
  closeModal(newPostModal);
  newPostForm.reset();
}
const showInputError = (config) => {};

const hideInputError = (config) => {};

const checkInputValidity = (config) => {};
const hasInvalidInput = (config) => {};
const toggleButtonState = (config) => {};
const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add("modal__submit-btn_disabled");
};
const resetValidation = (inputList, formElement) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElment) => {
    setEventListeners(formElment, config);
  });
};

const settings = {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  disableButton,
  resetValidation,
  setEventListeners,
  enableValidation,
};
