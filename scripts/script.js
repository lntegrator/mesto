const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileCloseButton = document.querySelector('.popup__button-close');
const personName = document.querySelector('.profile__title');
const description = document.querySelector('.profile__subtitle')
const inputName = document.querySelector('.form__field_type_name');
const inputJob = document.querySelector('.form__field_type_job')

function openPopup(){
    popup.classList.add('popup_opened');
    inputName.value = personName.textContent;
    inputJob.value = description.textContent;
}

function closePopUp(){
    popup.classList.remove('popup_opened')
}

edit.addEventListener('click', openPopup);
profileCloseButton.addEventListener('click', closePopUp);

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__field_type_name');
const jobInput = formElement.querySelector('.form__field_type_job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    personName.textContent = nameInput.value;
    description.textContent = jobInput.value;
    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);