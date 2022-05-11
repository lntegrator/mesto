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

    deleteCard(link, id){
        return this._sendRequest(fetch(`${link}${id}`, {
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
                    console.log('Ошибка при получении ответа')
                }
            })
            .then((res) => {
                return res
            })
    }

}