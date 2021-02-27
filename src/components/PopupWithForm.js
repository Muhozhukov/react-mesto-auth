import React from 'react';
import closePopupImagePath from '../images/close__icon.svg';

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.isOpen && props.name} ${props.isOpen && 'popup_opened'}`}>
            <form onSubmit={props.onSubmit} className="popup__form popup__cantainer popup__form_profile" name={props.name} noValidate>
                <button onClick={props.onClose} className="popup__close-button" type="reset">
                    <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
                </button>
                <div className="popup__container">
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button className="popup__submit-button" type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}


export default PopupWithForm;