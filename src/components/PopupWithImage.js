import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__photo');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(link, name){
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}