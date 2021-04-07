import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  initialCards,
  editButton,
  addButton,
  nameInput,
  jobInput,
  optionsList,
  popupProfileSelector,
  popupPlaceSelector,
} from "../scripts/utils/constants.js";

// Попап с картинкой

const popupImg = new PopupWithImage(".popup_pic");

// Функция создания карточки

const createCard = (item) => {
  const newCard = new Card(item, ".template", {
    handleCardClick: () => {
      popupImg.open(item);
    }
  });
  return newCard.generateCard();
};

// Экземпляр класса Section для блока с карточками

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    }
  },
  ".elements"
);

cardsList.renderItems();

// Экземпляр класса UserInfo

const user = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

// Экземпляр класса PopupWithForm для профиля

const popupProfile = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      user.setUserInfo(item);
      popupProfile.close();
    },
  },
  ".popup_profile"
);

const editProfileInfo = () => {
  const profileInfo = user.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  profileValidator.clearForm();
  popupProfile.open();
};

// Экземпляр класса PopupWithForm для добавления карточки

const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
      popupPlace.close();
    },
  },
  ".popup_place"
);

// Слушатели

editButton.addEventListener("click", editProfileInfo);

addButton.addEventListener("click", () => {
  placeValidator.clearForm();
  popupPlace.open();
});

popupImg.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();

// Валидация формы «Редактировать профиль»

const profileValidator = new FormValidator(optionsList, popupProfileSelector);
profileValidator.enableValidation();

// Валидация формы «Новое место»

const placeValidator = new FormValidator(optionsList, popupPlaceSelector);
placeValidator.enableValidation();
