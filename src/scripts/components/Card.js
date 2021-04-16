export default class Card {
  constructor(item, selector, currentUser, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._caption = item.name;
    this._image = item.link;
    this._likes = item.likes;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._userId = currentUser._id;
    this._isOwner = this._ownerId === this._userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = () => handleDeleteClick(item._id, () => this._handleDelete());
    this._handleLikeClick = () => handleLikeClick(item._id, this._element
      .querySelector(".element__like-button")
      .classList.contains("element__like-button_active"), 
      (arr) => this._likeCard(arr));
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(".element__delete-button");
    if (this._isOwner) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick();
      });
    } else {
      this._deleteButton.remove();
    }

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _likeCard(arr) {
    if (arr.some((like) => like._id === this._userId)) {
      this._element
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
    } else {
      this._element
        .querySelector(".element__like-button")
        .classList.remove("element__like-button_active");
    }
    this._element.querySelector(".element__likes-count").textContent = arr.length;
  }

  _handleDelete() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector(".element__image");
    const caption = this._element.querySelector(".element__caption");

    image.src = this._image;
    image.alt = this._caption;
    caption.textContent = this._caption;

    this._likeCard(this._likes);

    return this._element;
  }
}
