let edit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close = document.querySelector('.popup__icon-close');
let person_name = document.querySelector('.profile__title');
let description = document.querySelector('.profile__subtitle')
let inputs = document.querySelectorAll('input');

function OpenPopup(){
    popup.classList.toggle('popup_opened');
    inputs[0].value = person_name.textContent;
    inputs[1].value = description.textContent;
}

edit.addEventListener('click', OpenPopup);
close.addEventListener('click', OpenPopup);

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__name');
let jobInput = formElement.querySelector('.form__job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput = formElement.querySelector('.form__name').value;
    jobInput = formElement.querySelector('.form__job').value;
    person_name.textContent = nameInput;
    description.textContent = jobInput;
    popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);