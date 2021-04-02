import Card from "./CCard.js";
import { optionsList, FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

// Добавление карточек из массива

const elementsContainer = document.querySelector(".elements");

function createCard(item) {
  const card = new Card(item.name, item.link, ".template");
  return card.generateCard();
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  elementsContainer.append(newCard);
});

// Попап редактирование профиля

const popupProfile = document.querySelector(".popup_profile");
const formProfile = popupProfile.querySelector(".popup__container");
const editButton = document.querySelector(".profile__edit-button");
const nameInput = formProfile.querySelector(".popup__input_name");
const jobInput = formProfile.querySelector(".popup__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

function editProfile() {
  openPopup(popupProfile);
  nameInput.value = "";
  jobInput.value = "";
  profileValidator.clearForm();
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Попап добавления новой карточки

const addButton = document.querySelector(".profile__add-button");
const popupPlace = document.querySelector(".popup_place");
const formPlace = popupPlace.querySelector(".popup__container");
const titleInput = formPlace.querySelector(".popup__input_title");
const linkInput = formPlace.querySelector(".popup__input_link");

function addPlace() {
  openPopup(popupPlace);
  titleInput.value = "";
  linkInput.value = "";
  placeValidator.clearForm();
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: titleInput.value,
    link: linkInput.value
  };
  const newCard = createCard(card);
  elementsContainer.prepend(newCard);
  closePopup(popupPlace);
}

// Попап с картинкой

export const popupPic = document.querySelector(".popup_pic");
export const popupImage = popupPic.querySelector(".popup__image");
export const popupCaption = popupPic.querySelector(".popup__caption");

// Открытие попапа

export function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupOnEsc);
}

// Закрытие попапа

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupOnEsc);
}

// Закрытие попапа нажатием на Esc

function closePopupOnEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

// Закрытие попапа кликом на оверлей и кнопку закрытия

const popupList = document.querySelectorAll(".popup");

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

// Слушатели

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", addPlace);
formProfile.addEventListener("submit", handleProfileSubmit);
formPlace.addEventListener("submit", handlePlaceSubmit);

// Валидация формы «Редактировать профиль»

const profileValidator = new FormValidator(optionsList, popupProfile);
profileValidator.enableValidation();

// Валидация формы «Новое место»

const placeValidator = new FormValidator(optionsList, popupPlace);
placeValidator.enableValidation();
