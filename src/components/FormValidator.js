import { buttonCreateCard } from "../utils/constants.js";

export class FormValidator{
  constructor(object, formElement){
    this._formElement = formElement;
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }

  //Метод установки слушателя на форму
  _setEventListener(){
    this.inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this.buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      })
    })
  };

  //Метод переключения состояния кнопки отправки
  toggleButtonState(){
    if (this._hasInvalid()){
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.disabled = true;
      this.blockButton();
    }
    else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };

  //Метод проверки валидности всех полей для работы с кнопкой
  _hasInvalid(){
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Метод проверки валидности поля
  _isValid(inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else{
      this._hideInputError(inputElement)
    }
  }

  //Метод отображения ошибки валидации
  _showInputError(field, errorMessage){
    const errorElement = this._formElement.querySelector(`.${field.id}-error`)
    field.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод скрытия ошибки валидации
  _hideInputError = (field) => {
    const errorElement = this._formElement.querySelector(`.${field.id}-error`);
    field.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Публичный метод блокировки кнопки сохранения
  blockButton(){
    buttonCreateCard.classList.add(this._inactiveButtonClass);
    buttonCreateCard.setAttribute('disabled', true);
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}