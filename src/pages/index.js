import "./index.css";

import Api from "../utils/Api.js";

import {
  enableValidation,
  resetValidation,
  disableButton,
  enableButton,
} from "../scripts/validation.js";

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const cardTemplate = document.querySelector("#card-template");
const cardlist = document.querySelector(".cards__list");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["profile-form"];
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const editProfileNameInput = editProfileModal?.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal?.querySelector(
  "#profile-description-input"
);

const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = document.forms["new-post-modal-form"];
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostTitleInput = newPostModal.querySelector("#card-description-input");
// const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
// const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");

const previewModalEl = document.querySelector("#preview-modal");
const previewImageEl = previewModalEl.querySelector(".modal__image");
const previewCaptionEl = previewModalEl.querySelector(".modal__caption");
const previewModalCloseBtn = previewModalEl.querySelector(
  ".modal__close-btn_type_preview"
);

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__add-btn");
const profileAvatar = document.querySelector(".profile__avatar");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6be6056e-cabb-407d-bdc2-45a8de47d6fb",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    console.log("Cards: ", cards);
    console.log("User info:", user);

    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      if (cardElement) {
        cardlist.append(cardElement);
      }
    });

    profileNameEL.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatar.src = user.avatar;
    profileAvatar.alt = user.name;
  })
  .catch((err) => {
    console.log("Error loading app data:", err);
  });

const safeValidationCall = (validationFn, ...args) => {
  if (typeof validationFn === "function") {
    try {
      return validationFn(...args);
    } catch (error) {
      console.warn(`Error calling validation function:`, error);
    }
  } else {
    console.warn(`Validation function not available or not a function`);
  }
};

function getCardElement(data) {
  if (!cardTemplate) {
    console.error("Card template not found");
    return null;
  }

  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  if (!cardImageEl || !cardTitleEl) {
    console.error("Card elements not found in template");
    return null;
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardImageEl.addEventListener("error", function () {
    cardImageEl.src =
      "https://via.placeholder.com/300x200?text=Image+Not+Found";
    cardImageEl.alt = "Image not available";
  });

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", function () {
    openModal(deleteModal);
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
  if (!modal) {
    console.error("Modal element not found");
    return;
  }
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
  modal.addEventListener("click", handleOverlayClose);
}

function closeModal(modal) {
  if (!modal) {
    console.error("Modal element not found");
    return;
  }
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

function handleOpenEditProfileModal() {
  if (editProfileNameInput && profileNameEL) {
    editProfileNameInput.value = profileNameEL.textContent;
  }
  if (editProfileDescriptionInput && profileDescriptionEl) {
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  }
}

function openEditProfileModal() {
  if (editProfileModal) {
    openModal(editProfileModal);
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      if (profileNameEL) {
        profileNameEL.textContent = data.name;
      }
      if (profileDescriptionEl) {
        profileDescriptionEl.textContent = data.about;
      }

      if (editProfileModal) {
        closeModal(editProfileModal);
      }
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      if (profileAvatar) {
        profileAvatar.src = data.value;
        closeModal(avatarModal);
      }
    })
    .catch(console.error);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  if (!newPostTitleInput || !newPostLinkInput) {
    console.error("New post form inputs not found");
    return;
  }

  avatarForm.addEventListener("submit", handleAvatarSubmit);

  if (avatarCloseBtn) {
    avatarCloseBtn.addEventListener("click", function () {
      closeModal(avatarModal);
    });
  }

  const inputValues = {
    name: newPostTitleInput.value,
    link: newPostLinkInput.value,
  };

  const cardElement = getCardElement(inputValues);
  if (cardElement && cardlist) {
    cardlist.prepend(cardElement);
  }

  if (evt.submitter) {
    safeValidationCall(disableButton, evt.submitter, settings);
  }
  if (newPostForm) {
    safeValidationCall(resetValidation, newPostForm, settings);
  }

  evt.target.reset();
  if (newPostModal) {
    closeModal(newPostModal);
  }
}

const openNewPostModal = () => {
  if (newPostModal) {
    openModal(newPostModal);
  }
};

editProfileBtn.addEventListener("click", function () {
  handleOpenEditProfileModal();
  safeValidationCall(resetValidation, editProfileForm, settings);
  openEditProfileModal();
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

newPostBtn.addEventListener("click", function () {
  safeValidationCall(resetValidation, newPostForm, settings);
  openNewPostModal();
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModalEl);
});

profileAvatarBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

safeValidationCall(enableValidation, settings);
