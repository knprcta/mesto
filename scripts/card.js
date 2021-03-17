import { popupPic, popupImage, popupCaption, openPopup } from './index.js';

export default class Card {
  constructor(name, link, selector) {
    this._caption = name;
    this._image = link;
    this._selector = selector;
  }

  _getTemplate() {
   const cardElement = document.querySelector('.template').content.querySelector('.element').cloneNode(true);
   return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._caption;
    this._element.querySelector('.element__caption').textContent = this._caption;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImg();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  _handleOpenImg() {
    openPopup(popupPic);
    popupImage.src = this._image;
    popupImage.alt = this._caption;
    popupCaption.textContent = this._caption;
  }

  _handleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDelete() {
    this._element.closest('.element').remove();
  }
}