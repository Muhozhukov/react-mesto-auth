class Api {
  constructor(options) {
    this.headers = options.headers;
    this.baseUrl = options.baseUrl;
  }
  _handleOriginalResponse(res) {
    if(res.ok) {return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._handleOriginalResponse)
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._handleOriginalResponse)
  }
  editUserInfo(profileInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profileInfo.name,
        about: profileInfo.profession
      })
    })
    .then(this._handleOriginalResponse)
  }
  postNewCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(this._handleOriginalResponse)
  }
  likeToCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._handleOriginalResponse)
  }
  deleteLikeToCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._handleOriginalResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._handleOriginalResponse)
  }
  changeProfileAvatar(newAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatar.avatar
      })
    })
    .then(this._handleOriginalResponse)
  }
}
//123
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'de61a249-d226-492b-a95f-5f9f0d2e5b0c',
    'Content-Type': 'application/json'
  }
});
export default api;
