//Импорт

//Переменные кнопок
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//Попап профиля
const popupProfile = document.querySelector('.popup_type_profile');
const buttonProfileClose = popupProfile.querySelector('.popup__button-close');

//Попап места
const popupMesto = document.querySelector('.popup_type_mesto');
const buttonMestoClose = popupMesto.querySelector('.popup__button-close');
const buttonCreateCard = popupMesto.querySelector('.form__submit-button');

//Попап фото
const popupPhoto = document.querySelector('.popup_type_photo');
const buttonPhotoClose = popupPhoto.querySelector('.popup__button-close');
const imagePopupPhoto = popupPhoto.querySelector('.popup__photo');
const captionPopupPhoto = popupPhoto.querySelector('.popup__caption');

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
const sectionCards = document.querySelector('.elements');

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
buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAdd.addEventListener('click', () => openPopup(popupMesto));
buttonProfileClose.addEventListener('click', () => {closePopUp(popupProfile)});
buttonMestoClose.addEventListener('click', () => {closePopUp(popupMesto)});
formProfile.addEventListener('submit', formSubmitHandler);
formMesto.addEventListener('submit', formMestoSubmit);
buttonPhotoClose.addEventListener('click', () => closePopUp(popupPhoto));

//Функция открытия попапов
function openPopup(popupType){
    popupType.classList.add('popup_opened');
    if (popupType == popupProfile){
      fillProfilePopup();
    }
    document.addEventListener('keydown', closeEsc)
};

//Функция подставления значения в попап профиля со страницы
function fillProfilePopup(){
  nameInput.value = personName.textContent;
  jobInput.value = description.textContent;
};

//Функция закрытия попапов
function closePopUp(popupType){
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
};

//Функция сохранения карточки
function formMestoSubmit (evt){
    evt.preventDefault();
    const newCard = createCard(inputMesto.value, inputLink.value);
    sectionCards.prepend(newCard);
    closePopUp(popupMesto);
    formMesto.reset();
    buttonCreateCard.classList.add('form__submit-button_disabled');
    buttonCreateCard.setAttribute('disabled', true);
};

//Функция создания карточки
function createCard (mestoName, mestoLink){
    const cardElement = card.querySelector('.element').cloneNode(true);
    const cardPhoto = cardElement.querySelector('.element__image');

    //Создаем карточку
    cardPhoto.src = mestoLink;
    cardElement.querySelector('.element__name').textContent = mestoName;
    cardPhoto.alt = mestoName;

    //Лайк карточки
    const likeButton = cardElement.querySelector('.element__button');
    likeButton.addEventListener('click', likeCard);

    //Удаление карточки
    const deleteCard = cardElement.querySelector('.element__delete');
    deleteCard.addEventListener('click', function(){
        const currentCard = deleteCard.closest('.element');
        currentCard.remove();
    });

    //Открытие фото в попапе
    cardPhoto.addEventListener('click', function(evt){
        const mesto = evt.target;
        imagePopupPhoto.src = mesto.src;
        imagePopupPhoto.alt = mesto.alt;
        captionPopupPhoto.textContent = mesto.alt;
        openPopup(popupPhoto);
    });
    
    return cardElement;
    //validate.enableValidation();
}

//Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('element__button_active');
}

//Генерация карточек из массива
initialCards.forEach(function(item){
  sectionCards.append(createCard(item.name, item.link));
});

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
overlayPhoto.addEventListener('click', () => closePopUp(popupProfile));