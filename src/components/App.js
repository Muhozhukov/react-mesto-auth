import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import * as auth from '../utils/auth.js';
import failPic from '../images/signup-fail.svg';
import successPic from '../images/signup-success.svg';

function App() {

  // данные профиля
  const [currentUser, setCurrentUser] = React.useState('#');

  // попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  // попап с уведомлением о входе
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [toolTipTitle, setTooltipTitle] = React.useState('');
  const [tolltipPic, setTooltipPic] = React.useState('')



  // карточки
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // данные пользователя
  const initialData = {
    email: ''
  }
  // авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [data, setData] = React.useState(initialData);
  const history = useHistory();

  // проверка токена
  const tokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // Получаем данные пользователя
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setData({
              email: res.data.email
            })
            history.push('/cards');
          }
        })
        .catch(() => history.push('/login'));
    }
  }, [history])

  // Метод обработки логина
  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
    .then(res => {
      // Секция для обработки ошибок запроса
      if (res.token) {
        setLoggedIn(true);
        // Записываем полученный jwt токен в локальное хранилище
        localStorage.setItem('jwt', res.token);
        tokenCheck();
        history.push('/cards');
      }
    })
    .catch((err) => {
      console.log(err);
      setTooltipPic(failPic)
      setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
      setIsInfoTooltipOpen(true);
    });
  }

  // Метод регистрации
    const handleRegister = (email, password) => {
      return auth.register(email, password)
      .then((res) => {
          setTooltipPic(successPic)
          setTooltipTitle('Вы успешно зарегистрировались');
          setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setTooltipPic(failPic);
        setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipOpen(true);
      })
    }
  // logout пользователя
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setData(initialData);
    setLoggedIn(false);
    history.push('/signin');
  }

  // клики по кнопкам
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  // обновление информации о профиле
  function handleUpdateUser(data) {
    api.editUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleUpdateAvatar(data) {
    api.changeProfileAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // добавление карточки
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Постановка лайка карточке
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeToCard(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.deleteLikeToCard(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  //Удаление карточки
  function handleCardDelete(card) {
    const cardIsMine = card.owner._id === currentUser._id;
    if (cardIsMine) {
      api.deleteCard(card._id)
      .then((res) => {
        const cardFilter = (item) => {
          if (item._id === card._id) {
            return false;
          } else {
            return true;
          }
        }
        const deletedCard = cards.filter(item => cardFilter(item));
          setCards(deletedCard)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

    //Получение информации о пользователе
  React.useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

    //Отрисовка карточек
  React.useEffect(() => {
      api.getInitialCards().then((res) => {
          setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  // При рендере компонента запускаем метод для проверки наличия токена
  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  return (
    <Switch>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Route path="/signin">
          <Login onLogin={handleLogin}
          setTooltipIsOpen={setIsInfoTooltipOpen}
          toolTipTitle={toolTipTitle}
          isInfoTooltipOpen={isInfoTooltipOpen}
          tolltipPic={tolltipPic}
          tokenCheck={tokenCheck}
          setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister}
          setTooltipIsOpen={setIsInfoTooltipOpen}
          toolTipTitle={toolTipTitle}
          isInfoTooltipOpen={isInfoTooltipOpen}
          tolltipPic={tolltipPic}
          onClose={closeAllPopups} />
        </Route>
        <ProtectedRoute
          path="/cards"
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={(data) => handleCardClick(data)}
          cards={cards}
          setCards={(data) => setCards(data)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          signout={handleSignOut}
          email={data.email}
          component={Main}>
        </ProtectedRoute>
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm title="Вы уверены" name="delete-image" />
        <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard} />
        <Route exact path="/">
          {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/signin" />}
        </Route>
      </div>
    </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
