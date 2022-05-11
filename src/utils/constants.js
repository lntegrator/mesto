//Переменные кнопок
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

//Попап профиля
export const popupProfile = document.querySelector('.popup_type_profile');

//Попап места
export const popupMesto = document.querySelector('.popup_type_mesto');
export const buttonCreateCard = popupMesto.querySelector('.form__submit-button');

//Попап удаления
export const popupDeleteCard = document.querySelector('.popup_type_delete')

//Имя и описание пользователя
export const personName = document.querySelector('.profile__title');
export const description = document.querySelector('.profile__subtitle');
export const avatar = document.querySelector('.profile__avatar');

//Формы и поля
export const formMesto = popupMesto.querySelector('.form');
export const inputMesto = popupMesto.querySelector('.form__field_type_mesto');
export const inputLink = popupMesto.querySelector('.form__field_type_link');
export const formProfile = popupProfile.querySelector('.form');
export const nameInput = formProfile.querySelector('.form__field_type_name');
export const jobInput = formProfile.querySelector('.form__field_type_job');

//Объект с селекторами для передачи его в класс валидации
export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__field-error',
    errorClass: 'form__input-error_active'
  }

  //Токен и идентификатор группы:
  export const myToken = 'c3260d2e-4f66-4b7f-aede-32be2658939f';
  export const groupId = 'cohort-40';