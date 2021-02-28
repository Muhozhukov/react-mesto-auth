import React from 'react';
import closePopupImagePath from '../images/close__icon.svg';
import signupPic from '../images/signup-success.svg';
function InfoTooltip(props) {
    return(
        <div className={`popup popup_type_${props.isOpen && props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__info-tooltip">
                <button onClick={props.onClose} className="popup__close-button" type="reset">
                    <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
                </button>
                <div className="popup__container">
                    <img className="popup__info-tooltip-pic" src={props.image} alt=""></img>
                    <h3 className="popup__title">{props.title}</h3>
                </div>
            </div>
        </div>
    )
}


export default InfoTooltip;