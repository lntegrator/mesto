export class Card {
    constructor( {name, link, handleCardClick, handleDeleteClick }, templateSelector, mestoOwner, myData, likes =[], cardId){
        this._image = link;
        this._name = name;
        this._selector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._owner = mestoOwner;
        this._myData = myData;
        this._cardId = cardId;
        this._handleDeleteClick = handleDeleteClick;
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
        const cardLikes = this._card.querySelector('.element__like-quantity');

        //Заполнение карточки
        cardPhoto.src = this._image;
        cardName.textContent = this._name;
        cardPhoto.alt = this._name;
        cardLikes.textContent = this._likes.length

        this._setEventListeners();

        //Возвращаем карточку
        return this._card;
    }

    //Метод навешивания обработчиков
    _setEventListeners(){
        
        //По кнопке лайка
        this._card.querySelector('.element__button').addEventListener('click', this._likeCard);

        //Проверяем, принадлежит ли эта карточка мне
        if (this._owner._id === this._myData._id){
            this._card.querySelector('.element__delete').classList.add('element__delete_active');
            //Клик по иконке удаления
            this._card.querySelector('.element__delete').addEventListener('click', () => {
                this._handleDeleteClick(this._cardId);
            });
        }

        //По изображению карточки
        this._card.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick({
                name: this._name,
                link: this._link
            })
        })
    }

    //Метод удаления карточки
    _deleteCard(evt){
        evt.target.closest('.element').remove();
    }

    //Метод переключения стиля кнопки лайка при клике
    _likeCard(evt){
        evt.target.classList.toggle('element__button_active');
    }

}