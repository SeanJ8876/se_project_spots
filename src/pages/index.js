import "./index.css";

import Api from "../utils/Api.js";

import { setButtonText } from "../utils/helper.js";

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

const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

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

let selectedCard, selectedCardId;

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

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    const isLiked = cardLikeBtn.classList.contains("card__like-btn_active");

    // Set loading state for like button
    setButtonText(cardLikeBtn, true, "♡", "Loading...");

    api
      .changeLikeStatus(data._id, isLiked)
      .then(() => {
        cardLikeBtn.classList.toggle("card__like-btn_active");
      })
      .catch((error) => {
        console.error("Failed to update like status:", error);
      })
      .finally(() => {
        // Reset button state
        setButtonText(cardLikeBtn, false, "♡");
      });
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", (evt) => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
  if (deleteCloseBtn) {
    deleteCloseBtn.addEventListener("click", function () {
      closeModal(deleteModal);
    });
  }

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
  const submitBtn = evt.submitter;

  // Use setButtonText function consistently
  setButtonText(submitBtn, true, "Save", "Saving...");

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
    .catch((error) => {
      console.error("Profile update failed:", error);
    })
    .finally(() => {
      setButtonText(submitBtn, false, "Save");
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((error) => {
      console.error("Delete failed:", error);
    })
    .finally(() => {
      setButtonText(submitBtn, false, "Delete");
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  if (!avatarInput.value.trim()) {
    console.error("Avatar URL is required");
    return;
  }

  submitBtn.disabled = true;
  setButtonText(submitBtn, true, "Save", "Saving...");

  api
    .editAvatar({ avatar: avatarInput.value })
    .then((data) => {
      if (profileAvatar && data.avatar) {
        profileAvatar.src = data.avatar;
        profileAvatar.alt = profileNameEL.textContent || "Profile Avatar";
      }

      avatarForm.reset();
      safeValidationCall(resetValidation, avatarForm, settings);
      closeModal(avatarModal);
    })
    .catch((error) => {
      console.error("Avatar update failed:", error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      setButtonText(submitBtn, false, "Save");
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  if (!newPostTitleInput || !newPostLinkInput) {
    console.error("New post form inputs not found");
    return;
  }

  setButtonText(submitBtn, true, "Create", "Creating...");

  const inputValues = {
    name: newPostTitleInput.value,
    link: newPostLinkInput.value,
  };

  api
    .addCard(inputValues)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      if (cardElement && cardlist) {
        cardlist.prepend(cardElement);
      }

      // Reset form and validation
      if (submitBtn) {
        safeValidationCall(disableButton, submitBtn, settings);
      }
      if (newPostForm) {
        safeValidationCall(resetValidation, newPostForm, settings);
      }

      evt.target.reset();
      if (newPostModal) {
        closeModal(newPostModal);
      }
    })
    .catch((error) => {
      console.error("Failed to create new post:", error);
    })
    .finally(() => {
      setButtonText(submitBtn, false, "Create");
    });
}

const openNewPostModal = () => {
  if (newPostModal) {
    openModal(newPostModal);
  }
};

// Event Listeners
// Event Listeners
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
  safeValidationCall(resetValidation, avatarForm, settings);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

if (avatarCloseBtn) {
  avatarCloseBtn.addEventListener("click", function () {
    closeModal(avatarModal);
  });
}

const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
if (deleteCloseBtn) {
  deleteCloseBtn.addEventListener("click", function () {
    closeModal(deleteModal);
  });
}

const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");
if (cancelBtn) {
  cancelBtn.addEventListener("click", function () {
    closeModal(deleteModal);
  });
}

safeValidationCall(enableValidation, settings);
