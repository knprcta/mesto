export default class Api {
  constructor({ baseUrl, token, groupId }) {
    this._url = baseUrl;
    this._token = token;
    this._groupId = groupId;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  setUserInfo(user) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._checkRes);
  }

  addCard(card) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  toogleLike(cardId, status) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${cardId}`, {
      method: status ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then(this._checkRes);
  }
}
