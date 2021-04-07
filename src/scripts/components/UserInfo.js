export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const info = {};
    info.name = this._userName.textContent;
    info.job = this._userJob.textContent;
    return info;
  }

  setUserInfo({ userName, userJob }) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;
  }
}
