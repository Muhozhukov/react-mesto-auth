import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
          name,
          link: url,
        });
        setName('');
        setUrl('');
        props.onClose();
      }
    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Новое место" name="edit-card">
          <label className="popup__lable">
            <input value={name} onChange={handleChangeName} id="card-title" className="popup__input popup__input_place" type="text" name="name" minLength="1" maxLength="30" placeholder="Название" autoComplete="off" required />
            <span className="popup__error" id="title-error">Вы пропустили это поле</span>
          </label>
          <label className="popup__lable">
            <input value={url} onChange={handleChangeUrl} id="card-url" className="popup__input popup__input_image-url" type="url" name="link" placeholder="Ссылка на картинку" autoComplete="off" required />
            <span className="popup__error" id="image-error">Вы пропустили это поле</span>
          </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;