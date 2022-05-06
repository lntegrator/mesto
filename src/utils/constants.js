//Переменные кнопок
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

//Попап профиля
export const popupProfile = document.querySelector('.popup_type_profile');

//Попап места
export const popupMesto = document.querySelector('.popup_type_mesto');
export const buttonCreateCard = popupMesto.querySelector('.form__submit-button');

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

//Массив данных карточек
export const initialCards = [
    {
      name: 'Stop War',
      link: 'https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

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