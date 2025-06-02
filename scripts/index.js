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
  cardlist.prepend(cardElement);
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

  // const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  // cardDeleteBtn.addEventListener("click", function () {
  //   cardElement.remove();
  // });

  cardImageEl.addEventListener("click", function () {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewTitleEl.textContent = data.name;
    // previewModal.classList.add("modal_is-opened");
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

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
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostTitleInput = newPostModal.querySelector("#card-description-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewTitleEl = previewModal.querySelector(".modal__caption");
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const profileNameEL = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const newPostBtn = document.querySelector(".profile__add-btn");

editProfileCloseBtn.addEventListener("click", function () {
  // editProfileNameInput.value = profileNameEL.textContent;
  // editProfileDescriptionInput.value = profileDescriptionEL.textContent:
  // editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  // previewModal.classList.remove("modal_is-opened");
  closeModal(previewModal);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEL.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  // editProfileModal.classList.add("modal_is-opened");
  openModal(editProfileModal);
});

newPostCloseBtn.addEventListener("click", function () {
  newPostLinkInput.value = newPostCloseBtn.textContent;
  newPostDescriptionInput.value = newPostDescriptionEL.textContent;
  // newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
});

newPostBtn.addEventListener("click", function () {
  // newPostModal.classList.add("modal_is-opened");
  openModal(newPostModal);
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEL.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

const inputValues = {
  name: newPostLinkInput.value,
  link: newPostTitleInput.value,
};

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement({ inputValues });
  cardlist.prepend(cardElement);
  newPostModal.classList.remove("modal_is-opened");
}
