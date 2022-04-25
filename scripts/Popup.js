export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__button-close');
        this._overlay = this._popupElement.querySelector('.popup__overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    //Метод открытия попапа
    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    //Метод закрытия попапа
    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //Метод закрытия по esc
    _handleEscClose(evt){
        if (evt.key === 'Escape'){
            this.close();
        }
    }

    //Слушатели
    setEventListeners(){
        this._closeButton.addEventListener('click', () => this.close());
        this._overlay.addEventListener('click', () => this.close());
    }

}