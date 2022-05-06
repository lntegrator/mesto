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