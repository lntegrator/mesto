import Popup from "./Popup.js";

export default class PopupDelete extends Popup{
    constructor(popupSelector, api, handleDeleteClick){
        super(popupSelector);
        this._api = api;
        //this._handleDeleteClick = handleDeleteClick;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupElement.addEventListener('click', (evt) => {
            evt.preventDefault();
        })
    }
}