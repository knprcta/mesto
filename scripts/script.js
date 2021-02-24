const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementsContainer = document.querySelector(".elements");
const templateEl = document.querySelector(".template");

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const itemImage = newItem.querySelector(".element__image");
  const imgCaption = newItem.querySelector(".element__caption");
  const likeButton = newItem.querySelector(".element__like-button");
  const deleteButton = newItem.querySelector(".element__delete-button");
  itemImage.src = item.link;
  itemImage.alt = item.name;
  imgCaption.textContent = item.name;
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-button_active");
  });
  deleteButton.addEventListener("click", deletePlace);
  itemImage.addEventListener("click", () => {
    openPic(item);
  });

  return newItem;
}

function render() {
  const html = initialCards.map(getItem);
  elementsContainer.append(...html);
}

render();

const popupProfile = document.querySelector(".popup_profile");
const formProfile = popupProfile.querySelector(".popup__container");
const editButton = document.querySelector(".profile__edit-button");
const nameInput = formProfile.querySelector(".popup__input_name");
const jobInput = formProfile.querySelector(".popup__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupOnEsc);
}

function editProfile() {
  openPopup(popupProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  hideInputError(formProfile, nameInput, optionsList);
  hideInputError(formProfile, jobInput, optionsList);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}

const addButton = document.querySelector(".profile__add-button");
const popupPlace = document.querySelector(".popup_mesto");
const formPlace = popupPlace.querySelector(".popup__container");
const titleInput = formPlace.querySelector(".popup__input_title");
const linkInput = formPlace.querySelector(".popup__input_link");

function addPlace(evt) {
  evt.preventDefault();
  const newPlace = getItem({ name: titleInput.value, link: linkInput.value });
  elementsContainer.prepend(newPlace);
  closePopup(popupPlace);
  titleInput.value = "";
  linkInput.value = "";
}

function deletePlace(evt) {
  const targetEl = evt.target.closest(".element");
  targetEl.remove();
}

const popupPic = document.querySelector(".popup_pic");
const popupFig = popupPic.querySelector(".popup__figure");
const popupImage = popupFig.querySelector(".popup__image");
const popupCaption = popupFig.querySelector(".popup__caption");

function openPic(item) {
  openPopup(popupPic);
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
}

function closePopupOnEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

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

editButton.addEventListener("click", editProfile);

addButton.addEventListener("click", () => {
  openPopup(popupPlace);
  hideInputError(formPlace, titleInput, optionsList);
  hideInputError(formPlace, linkInput, optionsList);
  titleInput.value = "";
  linkInput.value = "";
});

formProfile.addEventListener("submit", handleProfileSubmit);

formPlace.addEventListener("submit", addPlace);
