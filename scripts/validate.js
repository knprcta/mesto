const optionsList = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_no-valid',
  errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
  inputElement.classList.add(options.inputErrorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
  inputElement.classList.remove(options.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, options) => {
  const isNotValid = !inputElement.validity.valid;

  if (isNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  };
};

const toggleButtonState = (inputList, buttonElement) => {
  const hasNoValidInput = inputList.some(inputElement => !inputElement.validity.valid);

  if (hasNoValidInput) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  };
};

const setEventListeners = (formElement, options) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement);
    });
  });
  
  toggleButtonState(inputList, buttonElement);
};


const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

enableValidation(optionsList);