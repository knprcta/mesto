const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_no-valid');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_no-valid');
}

const checkInputValidity = (formElement, inputElement) => {
  const isNotValid = !inputElement.validity.valid;

  if (isNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
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

const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  
  toggleButtonState(inputList, buttonElement);
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  
  formList.forEach(setEventListeners);
};

enableValidation();