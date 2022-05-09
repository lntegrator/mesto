import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({ handleSubmit }, popupSelector, api, link, apiMethod){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputsList = Array.from(this._formElement.querySelectorAll('.form__field'));
        this._handleSubmit = handleSubmit;
        this._api = api;
        this._link = link;
        this._apiMethod = apiMethod;
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
        this._formElement.addEventListener('submit', () => {
            this._handleSubmit(this._getInputValues());
            this._api[this._apiMethod](this._link, this._getInputValues());
            this.close();
        });
    }

    close(){
        super.close();
        this._formElement.reset();
    }
}