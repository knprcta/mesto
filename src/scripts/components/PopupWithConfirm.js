import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardRemover);
    })
  }

  open(cardId, cardRemover) {
    super.open();
    this._cardId = cardId;
    this._cardRemover = cardRemover;
  }

}