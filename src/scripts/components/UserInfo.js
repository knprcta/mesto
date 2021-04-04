export default class UserInfo {
  constructor({ nameInputSelector, jobInputSelector }) {
    this._nameInput = document.querySelector(nameInputSelector);
    this._jobInput = document.querySelector(jobInputSelector);
  }

  getUserInfo() {
    const info = {};
    info.name = this._nameInput.textContent;
    info.job = this._jobInput.textContent;
    return info;
  }

  setUserInfo({ name, job }) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = job;
  }
}