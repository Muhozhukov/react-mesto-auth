import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
    const userInfo = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        setName(userInfo.name || '');
        setDescription(userInfo.about || '');
      }, [userInfo]); 
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          profession: description,
        });
        props.onClose();
      } 
return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
        <label className="popup__lable">
            <input value={name} onChange={handleChangeName} id="profile-name" className="popup__input popup__input_name" type="text" name="name" minLength="2" maxLength="40" placeholder="Имя" autoComplete="off" required />
            <span className="popup__error" id="name-error">Вы пропустили это поле</span>
        </label>
        <label className="popup__lable">
            <input value={description} onChange={handleChangeDescription} id="profile-profession" className="popup__input popup__input_profession" type="text" name="profession" minLength="2" maxLength="400" placeholder="О себе" autoComplete="off" required />
            <span className="popup__error" id="profession-error">Вы пропустили это поле</span>
        </label>
    </PopupWithForm>
)}
export default EditProfilePopup;