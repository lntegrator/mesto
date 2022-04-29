//Импорт классов и переменных 
import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { buttonEdit, buttonAdd,
  formProfile, formMesto, inputMesto, inputLink, nameInput, jobInput,
  initialCards, personName, description, validationConfig} from "../utils/constants.js"

//Объект класса UserInfo
const userInfo = new UserInfo({nameSelector:'.profile__title',
  descriptionSelector:'.profile__subtitle'})

//Создаем объект класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_photo');

//Создаем объект класса PopupWithForm для попапа добавления карточки
const popupAddingCard = new PopupWithForm({ handleSubmit: (inputsValues) => {
  const card = createCard(inputsValues.mestoName, inputsValues.mestoLink, '.card-template');
  cardsList.addItem(card);
}
}, '.popup_type_mesto');

//Создаем объект класса PopupWithForm для попапа редактирования профиля
const popupDescription = new PopupWithForm({
  handleSubmit:(inputsValues) => {
    userInfo.setUserInfo({
      name: inputsValues.personName,
      description: inputsValues.pesronDescription
    })
}}, '.popup_type_profile');

//Слушатель кнопки добавления карточки
buttonAdd.addEventListener('click', () => {
  formProfileValidation.toggleButtonState()
  popupAddingCard.open();
});

//Слушатель кнопки редактирования профиля
buttonEdit.addEventListener('click', () => {
  const userInformation = userInfo.getUserInfo();
  const userName = userInformation.name;
  const userDescription = userInformation.description;
  nameInput.value = userName;
  jobInput.value = userDescription;
  formMestoValidation.toggleButtonState();
  popupDescription.open();
})

//Функция создания карточки
function createCard (mestoName, mestoLink, cardSelector){
    const card = new Card({ name:mestoName,
      link:mestoLink,
      handleCardClick: () => {
        popupWithImage.open(mestoLink, mestoName)
      },
    },  cardSelector);
    const cardElement = card.makeCard();
    return cardElement;
}

//Слушатели закрытия попапов
popupWithImage.setEventListeners();
popupAddingCard.setEventListeners();
popupDescription.setEventListeners();

//Генерация карточек из массива
const cardsList = new Section({ items: initialCards, 
  renderer: (item) => {
    const card = createCard(item.name, item.link, '.card-template');
    cardsList.addItem(card);
  },
}, '.elements' );

cardsList.renderItems();

//Подключаем валидацию форм
//Валидация формы профиля
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();

//Валидация формы добавления карточки
const formMestoValidation = new FormValidator(validationConfig, formMesto);
formMestoValidation.enableValidation();