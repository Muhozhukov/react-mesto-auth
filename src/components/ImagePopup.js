import React from 'react';

import closePopupImagePath from '../images/close__icon.svg';

function ImagePopup(props) {
    
    //if (props.isOpen) {

        return(
        <div className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__cantainer popup__image-container">
        <button onClick={props.onClose} className="popup__close-button" type="reset">
            <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
        </button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <h3 className="popup__image-title">{props.card.name}</h3>
        </div>
        </div>
    )
//    } 
//     else {
//         return(
//             null
//         )
//     }
}
export default ImagePopup;