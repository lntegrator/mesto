//Валидация форм
const formElement = document.querySelector('.form'); //Берем форму
const formInput = formElement.querySelector('.form__field'); //Берем поле

//Добавляем обработчик всем полям формы
function setEventListener(formElement, object){
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);

  inputList.forEach(function(inputElement){
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

//Функция отображения ошибки валидации
function showInputError(formElement, field, errorMessage, object){
  const errorElement = formElement.querySelector(`.${field.id}-error`)
  field.classList.add(object.inputErrorClass);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = errorMessage;
}

//Функция скрытия ошибки валидации
const hideInputError = (formElement, field, object) => {
  const errorElement = formElement.querySelector(`.${field.id}-error`);
  field.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
}

//Функция проверки валидности поля
const isValid = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  }
  else{
    hideInputError(formElement, inputElement, object);
  }
}

//Функция проверки валидности всех полей для работы с кнопкой
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Функция изменения состояния кнопки (disabled)
const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else{
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Функция добавления обработчиков во все формы
function enableValidation(object){
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListener(formElement, object);
    });
  };

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit',
    inputErrorClass: 'form__field-error',
    errorClass: 'form__input-error_active'
}); 