import Popup from "./Popup.js";

export default class PopupDelete extends Popup{
    constructor(popupSelector, api, method, link, handleDelete){
        super(popupSelector);
        this._api = api;
        this._apiMethod = method;
        this._link = link;
        this._handleDelete = handleDelete;
        this._cardId=null;
    }

    cardId(id){
        this._cardId=id;
        return id;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._api[this._apiMethod](this._link, this._cardId);
            console.log(this._link, this._cardId)
            this.close();
        })
    }
}