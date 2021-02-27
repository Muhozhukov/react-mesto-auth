import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import cardDeleteButtonPath from "../images/Trash.svg";


function Card(props) {

  const userInfo = React.useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card);
      }  
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === userInfo._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
      `${isOwn ? 'element__delete-button' : 'element__delete-button_disabled'}`
    ); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === userInfo._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `${isLiked ? 'element__like-button element__like-button_active' : 'element__like-button'}`; 
      return (
    <div className="element">
      <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image" />
      <button onClick={() => { props.onCardDelete(props.card)}} className={cardDeleteButtonClassName} type="button">
        <img src={cardDeleteButtonPath} alt="Удалить" /></button>
      <div className="element__description">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__likes">
        <button onClick={() => props.onCardLike(props.card)} className={cardLikeButtonClassName} type="button">
        </button>
        <p className="element__number-of-likes">{props.card.likes.length}</p>
      </div>
      </div>
    </div>
)

}

export default Card;