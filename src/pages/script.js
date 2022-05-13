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
  validationConfig, myToken, groupId, personName,
  description, avatar, buttonChangeAvatar, formAvatar,
  buttonSubmitAvatar, buttonCreateCard, buttonSubmitProfile} from "../utils/constants.js"
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';

//Создаем объект класса PopupWithImage
  const popupWithImage = new PopupWithImage('.popup_type_photo'); 

//Объект класса UserInfo
  const userInfo = new UserInfo({nameSelector:'.profile__title',
  descriptionSelector:'.profile__subtitle', avatarSelector: '.profile__avatar'});

//Объект класса Api
const api = new Api({
  authorization: myToken,
  'Content-Type': 'application/json'
}, 'cohort-40')

//Создаем объект класса PopupWithForm для попапа редактирования профиля
const popupDescription = new PopupWithForm({
  handleSubmit:(inputsValues) => {
    buttonSubmitProfile.textContent = 'Сохранение...';
    function changeDescription(inputsValues){
      api.patchInfo(inputsValues)
      .then((res) => {
        userInfo.setUserInfo({
          name: inputsValues.personName,
          description: inputsValues.personDescription
        })
        popupDescription.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSubmitProfile.textContent = 'Сохранить';
      })
     }
     changeDescription(inputsValues)
  }}, '.popup_type_profile');


//Объект класса PopupWithForm для попапа смены аватара
const popupAvatar = new PopupWithForm({
  handleSubmit:(inputsValues) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    function changeAvatar(){
      api.patchAvatar(inputsValues)
      .then((res) => {
        userInfo.setAvatar(res)
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSubmitAvatar.textContent = 'Сохранить';
      })
    }
    changeAvatar(inputsValues)
  }
}, '.popup_type_avatar')

//Объект класса PopupDelete
const popupDeleteCard = new PopupDelete(
  {handleSubmit: (cardID, cardElement) => {
    function deleteCard(cardId){
      api.deleteCard(cardId)
      .then(() => {
        popupDeleteCard.close();
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      })
    }
    deleteCard(cardID);
  }},
  '.popup_type_delete',
  );

//Слушатель кнопки редактирования профиля
  buttonEdit.addEventListener('click', () => {
    formProfileValidation.resetValidation();
    const userInformation = userInfo.getUserInfo();
    const userName = userInformation.name;
    const userDescription = userInformation.description;
    nameInput.value = userName;
    jobInput.value = userDescription;
    popupDescription.open();
  });

//Слушатель клика на кнопку смены аватара
buttonChangeAvatar.addEventListener('click', () => {
  formAvatarValidation.resetValidation();
  popupAvatar.open();
} )

//Слушатели закрытия попапов
popupWithImage.setEventListeners();
popupDescription.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();

//Функция создания карточки
function createCard (mestoName, mestoLink, cardSelector, mestoOwner, myData, mestoLikes, cardId){
  const card = new Card({ 
    name:mestoName,
    link:mestoLink,
    handleCardClick: () => {
      popupWithImage.open(mestoLink, mestoName)
    },
    handleDeleteClick: (id) => {
      popupDeleteCard.cardId(id, cardElement); //Получаем ID карточки
      popupDeleteCard.open(); //Открываем попап удаления при нажатии
    },
    handleLikeClick: (id, likesObject) => {
      if (likesObject.some((likes) => likes._id === myData._id)){
        api.unlikeCard(groupId, id)
        .then(res => {
          card.unlikeCard(res)
        })
      }
      else{
        api.likeCard(groupId, id)
        .then(res => {
          card.likeCard(res)
        })
      }
    }
  },  cardSelector, mestoOwner, myData, mestoLikes, cardId);
  const cardElement = card.makeCard();
  return cardElement;
}

//Создаем промис для ожидания подгрузки инфы о юзере и карточках
Promise.all([api.getInfo(), api.getCards()])
  .then(([userData, data]) => {
    //Устанавливаем данные профиля из полученного ответа
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar
    });
    userInfo.setAvatar(userData);

    //Генерация карточек из массива
    const cardsList = new Section({ items: data, 
      renderer: (item) => {
        const card = createCard(item.name, item.link, '.card-template',  item.owner, userData, item.likes, item._id);
        cardsList.addItem(card);
      },
    }, '.elements' )

    //Рендер карточек
    cardsList.renderItems();

    //Создаем объект класса PopupWithForm для попапа добавления карточки
      const popupAddingCard = new PopupWithForm({ 
        handleSubmit: (inputsValues) => {
          buttonCreateCard.textContent = 'Сохранение...';
          function addCard(cardInfo) {
            api.postCard({
              name: cardInfo.mestoName,
              link: cardInfo.mestoLink   
             })
            .then((res) => {
              const card = createCard(res.name, res.link, '.card-template', userData, userData);
              cardsList.addItem(card);
              popupAddingCard.close() //закрываем попап после добавления карточки
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              buttonCreateCard.textContent = 'Создать'; //Возвращаем текст кнопки
            })
          }
          addCard(inputsValues) //Активируем функцию запроса и создания карточки
       }
       }, '.popup_type_mesto');

    //Слушатель кнопки добавления карточки
    buttonAdd.addEventListener('click', () => {
      formMestoValidation.resetValidation();
      popupAddingCard.open();
    });

    //Слушатель для закрытия попапа
    popupAddingCard.setEventListeners();
  })
  .catch((err) => {
    console.log(err);
  })

//Подключаем валидацию форм
//Валидация формы профиля
const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();

//Валидация формы добавления карточки
const formMestoValidation = new FormValidator(validationConfig, formMesto);
formMestoValidation.enableValidation();

//Валидация формы изменения аватара
const formAvatarValidation = new FormValidator(validationConfig, formAvatar);
formAvatarValidation.enableValidation();