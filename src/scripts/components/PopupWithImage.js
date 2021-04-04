import Popup from "./Popup.js";
import { popupImage, popupCaption } from '../../pages/index.js';


export default class PopupWithImage extends Popup {
  constructor({ name, link }, selector) {
    super(selector);
    this._caption = name;
    this._image = link;
  }

  open() {
    super.open();
    popupImage.src = this._image;
    popupImage.alt = this._caption;
    popupCaption.textContent = this._caption;
  }
}
