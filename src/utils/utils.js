// Задание попапов
export const profileEditorPopup = document.querySelector('.popup_type_edit-profile');
export const addCardPopup = document.querySelector('.popup_type_edit-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const deleteImagePopup = document.querySelector('.popup_type_delete-image');
export const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');

// Задание кнопок открытия
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addCard = document.querySelector('.profile__add-button');
export const editAvatar = document.querySelector('.profile__edit-avatar-button-container');

// Задание кнопок закрытия
export const profileEditorCloseButton = profileEditorPopup.querySelector('.popup__close-button');
export const addCardCloseButton = addCardPopup.querySelector('.popup__close-button');
export const imageCloseButton = imagePopup.querySelector('.popup__close-button');

// Задание кнопок сохранить
export const profileEditSaveButton = profileEditorPopup.querySelector('.popup__submit-button');
export const addCardSaveButton = addCardPopup.querySelector('.popup__submit-button');
export const editAvatarSaveButton = avatarEditPopup.querySelector('.popup__submit-button')

//Задание темплейта и формы карточки
export const elements = '.elements';

//Задание полей для заполнения
export const nameInput = profileEditorPopup.querySelector('.popup__input_name');
export const jobInput = profileEditorPopup.querySelector('.popup__input_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
//export const profileAvatar = document.querySelector('.profile__image');
export const profileAvatar = document.querySelector('.profile__image-container');

export const cardNameInput = addCardPopup.querySelector('.popup__input_place');
export const cardImageInput = addCardPopup.querySelector('.popup__input_image-url')

export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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
export const validateData = {
  formSelector: '.popup__form',
  formProfileSelector: '.popup__form_profile',
  formCardSelector: '.popup__form_card',
  inputSelector: '.popup__input',
  inputValidClass: 'popup__input_valid',
  inputErrorClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__submit-button',
  activeButtonSelector: 'popup__submit-button_active',
  disabledButtonSelector: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible'
}

export const forms = Array.from(document.querySelectorAll(validateData.formSelector))
