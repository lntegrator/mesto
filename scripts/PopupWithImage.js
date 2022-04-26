import { Popup } from "./imports.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._popupImage = document.querySelector('.popup__photo');
        this._popupCaption = document.querySelector('.popup__caption');
    }

    open(link, name){
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}