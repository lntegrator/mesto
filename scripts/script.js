//Импорт
import { Card, FormValidator } from "./imports.js";
import Section from "./Section.js";


//Переменные кнопок
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//Попап профиля
const popupProfile = document.querySelector('.popup_type_profile');
const buttonProfileClose = popupProfile.querySelector('.popup__button-close');

//Попап места
const popupMesto = document.querySelector('.popup_type_mesto');
const buttonMestoClose = popupMesto.querySelector('.popup__button-close');
export const buttonCreateCard = popupMesto.querySelector('.form__submit-button');

//Попап фото
export const popupPhoto = document.querySelector('.popup_type_photo');
const buttonPhotoClose = popupPhoto.querySelector('.popup__button-close');
export const imagePopupPhoto = popupPhoto.querySelector('.popup__photo');
export const captionPopupPhoto = popupPhoto.querySelector('.popup__caption');

//Имя и описание пользователя
const personName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle');

//Формы и поля
const formMesto = popupMesto.querySelector('.form');
const inputMesto = popupMesto.querySelector('.form__field_type_mesto');
const inputLink = popupMesto.querySelector('.form__field_type_link');
const formProfile = popupProfile.querySelector('.form');
const nameInput = formProfile.querySelector('.form__field_type_name');
const jobInput = formProfile.querySelector('.form__field_type_job');

//Переменные карточек
const card = document.querySelector('.card-template').content;
const cardName = document.querySelector('.element__name');
const cardImage = document.querySelector('.element__image');

//Массив данных карточек
const initialCards = [
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

//Слушатели событий
buttonEdit.addEventListener('click', () => fillProfilePopup(popupProfile));
buttonAdd.addEventListener('click', () => openPopup(popupMesto));
buttonProfileClose.addEventListener('click', () => {closePopUp(popupProfile)});
buttonMestoClose.addEventListener('click', () => {closePopUp(popupMesto)});
formProfile.addEventListener('submit', formSubmitHandler);
formMesto.addEventListener('submit', formMestoSubmit);
buttonPhotoClose.addEventListener('click', () => closePopUp(popupPhoto));

//Функция подставления значения в попап профиля со страницы
function fillProfilePopup(popupType){
  nameInput.value = personName.textContent;
  jobInput.value = description.textContent;
  openPopup(popupType);
};

//Функция открытия попапов
export function openPopup(popupType){
    popupType.classList.add('popup_opened');
    document.addEventListener('keydown', closeEsc)
};

//Функция закрытия попапов
function closePopUp(popupType){
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
};

//Функция сохранения карточки
function formMestoSubmit (evt){
    evt.preventDefault();
    const newCard = createCard(inputMesto.value, inputLink.value, '.card-template');
    sectionCards.prepend(newCard);
    closePopUp(popupMesto);
    formMesto.reset();
    formMestoValidation.blockButton();
};

//Функция создания карточки
function createCard (mestoName, mestoLink, cardSelector){
    const card = new Card({ name:mestoName,
      link:mestoLink,
      handleCardClick: () => {
        
      }},  cardSelector);
    const cardElement = card.makeCard();
    return cardElement;
}

//Генерация карточек из массива
const cardsList = new Section({ items: initialCards, 
  renderer: (item) => {
    const card = new Card({name:item.name, link:item.link}, '.card-template');
    const cardElement = card.makeCard();
    cardsList.addItem(cardElement);
  },
}, '.elements' );

cardsList.renderItems();

//initialCards.forEach((item) => {
  //sectionCards.append(createCard(item.name, item.link, '.card-template'));
//});

//Функция сохранения изменения профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  personName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopUp(popupProfile);
}

//Функция закрытия попапа при нажатии Esc
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopUp(openedPopup);
  }
};

//Находим все оверлеи для отслеживания кликов по ним
const overlayProfile = document.querySelector('.popup__overlay_profile');
const overlayMesto = document.querySelector('.popup__overlay_mesto');
const overlayPhoto = document.querySelector('.popup__overlay_photo');

//Слушаем клики на оверлеи для закрытия
overlayProfile.addEventListener('click', () => closePopUp(popupProfile));
overlayMesto.addEventListener('click', () => closePopUp(popupMesto));
overlayPhoto.addEventListener('click', () => closePopUp(popupPhoto));

//Объект с селекторами для передачи его в класс валидации
const object = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field-error',
  errorClass: 'form__input-error_active'
}

//Подключаем валидацию форм
//Валидация формы профиля
const formProfileValidation = new FormValidator(object, formProfile);
formProfileValidation.enableValidation();

//Валидация формы добавления карточки
const formMestoValidation = new FormValidator(object, formMesto);
formMestoValidation.enableValidation();