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
  const deleteButton = newItem.querySelector('.element__delete-button');
  itemImage.src = item.link;
  itemImage.alt = item.name;
  imgCaption.textContent = item.name;
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
  });
  deleteButton.addEventListener('click', mestoDelete);
  itemImage.addEventListener('click', () => {
    picOpen(item)
  });

  return newItem;
}

function render() {
  const html = initialCards.map(getItem);
  elementsContainer.append(...html);
}

render();

let popupProfile = document.querySelector('.popup_profile');
let formProfile = popupProfile.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let nameInput = formProfile.querySelector('.popup__input_name');
let jobInput = formProfile.querySelector('.popup__input_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let closeButtonProfile = formProfile.querySelector('.popup__close-button');


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

}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClose(popupProfile);
}

let addButton = document.querySelector('.profile__add-button');
let popupMesto = document.querySelector('.popup_mesto');
let formMesto = popupMesto.querySelector('.popup__container');
let titleInput = formMesto.querySelector('.popup__input_title');
let linkInput = formMesto.querySelector('.popup__input_link');
let closeButtonMesto = formMesto.querySelector('.popup__close-button');

function mestoAdd(evt) {
  evt.preventDefault();
  const newMesto = getItem({ name: titleInput.value, link: linkInput.value });
  elementsContainer.prepend(newMesto);
  popupClose(popupMesto);
  titleInput.value = '';
  linkInput.value = '';
}

function mestoDelete(evt) {
  const targetEl = evt.target.closest('.element');
  targetEl.remove();
}

let popupPic = document.querySelector('.popup_pic');
let popupFig = popupPic.querySelector('.popup__figure');
let popupImage = popupFig.querySelector('.popup__image');
let popupCaption = popupFig.querySelector('.popup__caption');
let closeButtonPic = popupFig.querySelector('.popup__close-button');

function picOpen(item) {
  popupOpen(popupPic);
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
}

editButton.addEventListener('click', profileEdit);
addButton.addEventListener('click', () => {
  popupOpen(popupMesto)
});
formProfile.addEventListener('submit', formSubmitHandler);
formMesto.addEventListener('submit', mestoAdd);
closeButtonProfile.addEventListener('click', () => {
  popupClose(popupProfile)
});
closeButtonMesto.addEventListener('click', () => {
  popupClose(popupMesto)
});
closeButtonPic.addEventListener('click', () => {
  popupClose(popupPic)
});