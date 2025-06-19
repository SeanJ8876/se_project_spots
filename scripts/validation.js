const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageID = (inputElement.id = +"#…-error");
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add("modal__input_type_error");
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = "";
  inputElement.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__submit-btn_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__submit-btn_disabled");
  }
};

const disableButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
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
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const validation = {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  disableButton,
  resetValidation,
  setEventListeners,
  enableValidation,
  settings,
};

enableValidation(settings);
