import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({handleSubmit}, popupSelector){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputsList = Array.from(this._formElement.querySelectorAll('.form__field'));
        this._handleSubmit = handleSubmit;
    }

    _getInputValues(){
        const inputsValues = {};
        this._inputsList.forEach((input) => {
            inputsValues[input.name] = input.value;
        })
        return inputsValues;
    }

    setEventListeners(){
        super(this.setEventListeners);
        
    }

    close(){
        super(close());
    }
}