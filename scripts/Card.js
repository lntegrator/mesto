import { popupPhoto, imagePopupPhoto, openPopup, captionPopupPhoto } from "./imports.js";

export class Card {
    constructor(name, link, templateSelector){
        this._image = link;
        this._name = name;
        this._selector = templateSelector;
    }

    //Ищем шаблон карточки
    _getTemplate(){
        const card = document.querySelector(this._selector).content;
        const cardElement = card.querySelector('.element').cloneNode(true);
        return cardElement;        
    }

    //Метод создания карточки
    makeCard(){
        this._card = this._getTemplate();
        const cardPhoto = this._card.querySelector('.element__image');
        const cardName = this._card.querySelector('.element__name');

        //Заполнение карточки
        cardPhoto.src = this._image;
        cardName.textContent = this._name;
        cardPhoto.alt = this._name;

        //Лайк карточки
        this._iconLike = this._card.querySelector('.element__button');
        this._iconLike.addEventListener('click', this._likeCard);

        //Удаление карточки
        this._deleteButton = this._card.querySelector('.element__delete');
        this._deleteButton.addEventListener('click', this._deleteCard);

        //Слушатель клика по карточке
        cardPhoto.addEventListener('click', () => {
            imagePopupPhoto.src = this._image;
            imagePopupPhoto.alt = this._name;
            captionPopupPhoto.textContent = this._name;
            openPopup(popupPhoto);
        } )

        //Возвращаем карточку
        return this._card;
    }

    //Метод подставления данных в попап

    //Метод удаления карточки
    _deleteCard(evt){
        evt.target.closest('.element').remove();
    }

    //Метод переключения стиля кнопки лайка при клике
    _likeCard(evt){
        evt.target.classList.toggle('element__button_active');
    }

}