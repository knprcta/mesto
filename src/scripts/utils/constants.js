export const validatorConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_no-valid",
  errorClass: "popup__input-error_active",
};

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1",
  token: "b8b224d2-63d9-411f-917f-a9b5efe62b74",
  groupId: "cohort-22",
};

export const popupProfileSelector = document.querySelector(".popup_profile");
export const editButton = document.querySelector(".profile__edit-button");
export const nameInput = document.querySelector(".popup__input_name");
export const aboutInput = document.querySelector(".popup__input_about");

export const popupPlaceSelector = document.querySelector(".popup_place");
export const addButton = document.querySelector(".profile__add-button");

export const popupAvatarSelector = document.querySelector(".popup_avatar");
export const editAvatar = document.querySelector(".profile__edit-avatar");
