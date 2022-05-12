export default class Api{
    constructor(headers){
        this._headers = headers;
    }

    getInfo(link){
        return this._sendRequest(fetch(link, {
            method: 'GET',
            headers: this._headers
        }));
    }

    postCard(link, cardInfo){
        return this._sendRequest(fetch(link, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.mestoName,
                link: cardInfo.mestoLink
            })
        }))
    }

    patchInfo(link, info){
        return this._sendRequest(fetch(link, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.personName,
                about: info.personDescription
            })
        }))
    }

    patchAvatar(link, avatarInfo){
        return this._sendRequest(fetch(link, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarInfo.avatarLink
            })
        }))
    }

    deleteCard(link, id){
        return this._sendRequest(fetch(`${link}${id}`, {
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
                else{
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((res) => {
                return res
            })
    }
}