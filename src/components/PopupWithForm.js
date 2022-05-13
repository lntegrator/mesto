import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({ handleSubmit }, popupSelector){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._buttonSubmit = this._popupElement.querySelector('.form__submit-button')
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
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    close(){
        super.close();
        this._formElement.reset();
    }
}