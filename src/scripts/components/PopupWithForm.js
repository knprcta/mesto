import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selector) {
    super(selector);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._element.querySelector(".popup__container");
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmit);
  }
}
