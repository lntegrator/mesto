//Импорт классов и переменных 
import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { buttonEdit, buttonAdd,
  formProfile, formMesto, nameInput, jobInput,
  validationConfig, myToken, groupId, personName, description, avatar} from "../utils/constants.js"
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';

//Создаем объект класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_photo');

//Объект класса PopupDelete
const popupDeleteCard = new PopupDelete('.popup_type_delete', api, );

//Функция создания карточки
function createCard (mestoName, mestoLink, cardSelector, mestoOwner, myData, mestoLikes){
    const card = new Card({ name:mestoName,
      link:mestoLink,
      handleCardClick: () => {
        popupWithImage.open(mestoLink, mestoName)
      },
      handleDeleteClick: () => {
        popupDeleteCard.open();
      }
    },  cardSelector, mestoOwner, myData, mestoLikes);
    const cardElement = card.makeCard();
    return cardElement;
}

//Подключаем валидацию форм
//Валидация формы профиля
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();

//Валидация формы добавления карточки
const formMestoValidation = new FormValidator(validationConfig, formMesto);
formMestoValidation.enableValidation();

//РАБОТА С API

//Объект класса Api
const api = new Api({
  authorization: myToken,
  'Content-Type': 'application/json'
})

//Получаем информацию о юзере (мне) по API и заполняем в .then
api.getInfo(`https://nomoreparties.co/v1/${groupId}/users/me`) //О пользователе
  .then(res => {
    personName.textContent = res.name;
    description.textContent = res.about;
    avatar.src = res.avatar;
    const myData = res;
    return myData;
  })
  .then((myData) => { //О первых карточках + все остальные функции
    api.getInfo(`https://nomoreparties.co/v1/${groupId}/cards`)
    .then(res => {
      //Генерация карточек из массива
      const cardsList = new Section({ items: res, 
        renderer: (item) => {
          const card = createCard(item.name, item.link, '.card-template',  item.owner, myData, item.likes);
          cardsList.addItem(card);
        },
      }, '.elements' );

      cardsList.renderItems();

      //Создаем объект класса PopupWithForm для попапа добавления карточки
      const popupAddingCard = new PopupWithForm({ handleSubmit: (inputsValues) => {
        console.log(myData)
        const card = createCard(inputsValues.mestoName, inputsValues.mestoLink, '.card-template', myData, myData);
        cardsList.addItem(card);
      }
      }, '.popup_type_mesto', api, `https://mesto.nomoreparties.co/v1/${groupId}/cards`, 'postCard');

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
        popupDescription.open();
      })

      //Объект класса UserInfo
      const userInfo = new UserInfo({nameSelector:'.profile__title',
      descriptionSelector:'.profile__subtitle'})

      //Создаем объект класса PopupWithForm для попапа редактирования профиля
      const popupDescription = new PopupWithForm({
      handleSubmit:(inputsValues) => {
        userInfo.setUserInfo({
          name: inputsValues.personName,
          description: inputsValues.personDescription
        })
      }}, '.popup_type_profile', api, `https://nomoreparties.co/v1/${groupId}/users/me`, 'patchInfo');

      //Слушатели закрытия попапов
      popupWithImage.setEventListeners();
      popupDescription.setEventListeners();
      popupDeleteCard.setEventListeners();

      //Навешиваем слушатель на объект создания карточки
      popupAddingCard.setEventListeners();

    })

  })