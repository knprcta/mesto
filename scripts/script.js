let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');


function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);