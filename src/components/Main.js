import React from 'react';
import addButtonPath from '../images/add__button.svg';
import profileEditButtonPath from '../images/edit__button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const userInfo = React.useContext(CurrentUserContext);




  
  return (
    <main className="page__container">
    <section className="profile">
      <div className="profile__flex-container">
        <div className="profile__image-container" style={{ backgroundImage: `url(${userInfo.avatar})` }}>
          <div className="profile__edit-avatar-button-container">
            <button onClick={props.onEditAvatar} className="profile__edit-avatar-button"></button>
          </div>
        </div>
        <div className="profile__info-container">
          <div className="profile__info">
              <h1 className="profile__name">{userInfo.name}</h1>
              <p className="profile__profession">{userInfo.about}</p>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button">
            <img src={profileEditButtonPath} alt="Редактировать" className="profile__edit-button-image" />
          </button>
        </div>
      </div>
      <button onClick={props.onAddPlace} className="profile__add-button" type="button">
        <img src={addButtonPath} alt="Добавить" className="profile__add-button-image" />
      </button>
    </section>
    <section className="elements">
        {props.cards.map((card, i) => (
        <Card 
        onCardLike={(data) => props.onCardLike(data)}
        onCardClick={props.onCardClick} 
        onCardDelete={(data) => props.onCardDelete(data)}
        card={card} key={card._id} 
        onCardImageClick={props.onCardImageClick} />))}
    </section>
  </main>
  );
}

export default Main;