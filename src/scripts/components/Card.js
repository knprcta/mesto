export default class Card {
  constructor(name, link, selector, { handleCardClick }) {
    this._caption = name;
    this._image = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
   const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
   return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDelete();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  _handleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDelete() {
    this._element.closest('.element').remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector('.element__image');
    const caption = this._element.querySelector('.element__caption');

    image.src = this._image;
    image.alt = this._caption;
    caption.textContent = this._caption;

    return this._element;
  }
}