export default class Api{
    constructor(headers, cohortId){
        this._headers = headers;
        this._cohortId = cohortId;
    }

    getInfo(){
        return this._sendRequest(fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, 
        {
            method: 'GET',
            headers: this._headers
        }))
    }

    getCards(){
        return this._sendRequest(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`,{
            method: 'GET',
            headers: this._headers
        }))
    }

    postCard(cardInfo){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards `, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        }))
    }

    patchInfo(info){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.personName,
                about: info.personDescription
            })
        }))
    }

    patchAvatar(avatarInfo){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar `, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarInfo.avatarLink
            })
        }))
    }

    deleteCard(id){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }))
    }

    likeCard(groupId, id){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/${id}/likes `, {
            method: 'PUT',
            headers: this._headers
        }))
    }

    unlikeCard(groupId, id){
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/${id}/likes `, {
            method: 'DELETE',
            headers: this._headers
        }))
    }

    _sendRequest(promise){
        return promise
            .then((res) => {
                if (res.ok){
                    return res.json()
                }
                Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                return res
            })
    }

}