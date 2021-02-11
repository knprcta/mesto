const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsContainer = document.querySelector('.elements');
const templateEl = document.querySelector('.template');

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const itemImage = newItem.querySelector('.element__image');
  const imgCaption = newItem.querySelector('.element__caption');
  const likeButton = newItem.querySelector('.element__like-button');
  itemImage.src = item.link;
  itemImage.alt = item.name;
  imgCaption.textContent = item.name;
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
  });

  return newItem;
}

function render() {
  const html = initialCards.map(getItem);
  elementsContainer.prepend(...html);
}

render();

let popupProfile = document.querySelector('.popup_profile');
let formProfile = popupProfile.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let nameInput = formProfile.querySelector('.popup__input_name');
let jobInput = formProfile.querySelector('.popup__input_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

function profileEdit() {
  popupOpen(popupProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  let closeButton = formProfile.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => {
    popupClose(popupProfile)
  });
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose(popupProfile);
}

let addButton = document.querySelector('.profile__add-button');
let popupMesto = document.querySelector('.popup_mesto');
let formMesto = popupMesto.querySelector('.popup__container');


function mestoAdd() {
  popupOpen(popupMesto);
  let closeButton = formMesto.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => {
    popupClose(popupMesto)
  });
}

editButton.addEventListener('click', profileEdit);
addButton.addEventListener('click', mestoAdd);
formProfile.addEventListener('submit', formSubmitHandler);