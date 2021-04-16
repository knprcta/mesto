import "./index.css";
import Api from "../scripts/components/Api.js"
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  editButton,
  addButton,
  nameInput,
  aboutInput,
  validatorConfig,
  apiConfig,
  popupProfileSelector,
  popupPlaceSelector,
  popupAvatarSelector,
  editAvatar
} from "../scripts/utils/constants.js";

// ID пользователя

let currentUser = "";

// API

const api = new Api(apiConfig);

// Попап с картинкой

const popupImg = new PopupWithImage(".popup_pic");

// Попап с подтверждением удаления

const popupCardDel = new PopupWithConfirm({
  handleFormSubmit: (cardId, cardRemover) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardRemover();
        popupCardDel.close();
      })
      .catch((err) => {
        console.log(err);
      });
  } 
}, ".popup_confirm")

// Функция создания карточки

const createCard = (item) => {
  const newCard = new Card(item, ".template", currentUser, {
    handleCardClick: () => {
      popupImg.open(item);
    },
    handleDeleteClick: (id, remover) => {
      popupCardDel.open(id, remover);
    },
    handleLikeClick: (id, status, like) => {
      api
        .toogleLike(id, status)
        .then((res) => {
          like(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });
  return newCard.generateCard();
};

// Экземпляр класса Section для блока с карточками

const cardsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItemLast(card);
    }
  },
  ".elements"
);

// Экземпляр класса UserInfo

const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-img"
});

// Экземпляр класса PopupWithForm для профиля

const popupProfile = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      profileValidator.loading("Сохранение...");
      api
        .setUserInfo(item)
        .then((res) => {
          user.setUserInfo(res);
          popupProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          profileValidator.finish("Сохранить");
        })
    },
  },
  ".popup_profile"
);

const editProfileInfo = () => {
  const profileInfo = user.getUserInfo();
  nameInput.value = profileInfo.name;
  aboutInput.value = profileInfo.about;
  profileValidator.clearForm();
  popupProfile.open();
};

// Экземпляр класса PopupWithForm для добавления карточки

const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      placeValidator.loading("Сохранение...");
      api
        .addCard(item)
        .then((res) => {
          const card = createCard(res);
          cardsList.addItemFirst(card);
          popupPlace.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          placeValidator.finish("Создать");
        })
    },
  },
  ".popup_place"
);

// Экземпляр класса PopupWithForm для обновления аватара
const popupAvatar = new PopupWithForm({
  handleFormSubmit: (item) => {
    avatarValidator.loading("Сохранение...");
    api
      .updateAvatar(item)
      .then((res) => {
        user.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarValidator.finish("Сохранить");
      })
  }
},
".popup_avatar"
);


// Слушатели

editButton.addEventListener("click", editProfileInfo);

addButton.addEventListener("click", () => {
  placeValidator.clearForm();
  popupPlace.open();
});

editAvatar.addEventListener("click", () => {
  avatarValidator.clearForm();
  popupAvatar.open();
})

popupImg.setEventListeners();
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupCardDel.setEventListeners();
popupAvatar.setEventListeners();

// Валидация формы «Редактировать профиль»

const profileValidator = new FormValidator(validatorConfig, popupProfileSelector);
profileValidator.enableValidation();

// Валидация формы «Новое место»

const placeValidator = new FormValidator(validatorConfig, popupPlaceSelector);
placeValidator.enableValidation();

// Валидация формы «Обновить аватар»

const avatarValidator = new FormValidator(validatorConfig, popupAvatarSelector);
avatarValidator.enableValidation();

// Загрузка начальных данных и карточек с сервера

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    user.setUserInfo(userInfo);
    currentUser = userInfo;
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err));