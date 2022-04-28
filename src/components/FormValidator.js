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
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  };

  //Метод переключения состояния кнопки отправки
  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalid(inputList)){
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //Метод проверки валидности всех полей для работы с кнопкой
  _hasInvalid(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Метод проверки валидности поля
  _isValid(formElement, inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else{
      this._hideInputError(formElement, inputElement)
    }
  }

  //Метод отображения ошибки валидации
  _showInputError(formElement, field, errorMessage){
    const errorElement = formElement.querySelector(`.${field.id}-error`)
    field.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод скрытия ошибки валидации
  _hideInputError = (formElement, field) => {
    const errorElement = formElement.querySelector(`.${field.id}-error`);
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