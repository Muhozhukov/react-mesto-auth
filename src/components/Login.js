import React from 'react';
import Header from './Header';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';
import failPic from '../images/signup-fail.svg';

  function Login(props) {

    // попап с уведомлением о входе
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [toolTipTitle, setTooltipTitle] = React.useState('');
    const [tolltipPic, setTooltipPic] = React.useState('')

    function closeInfoTooltip() {
      setIsInfoTooltipOpen(false)
    }
    const initialData = {
      email: '',
      password: '',
    }
    const [data, setData] = React.useState(initialData);
    const history = useHistory();

    // Обрабатываем изменения в инпутах и записываем их в стейт
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData(data => ({
        ...data,
        [name]: value,
      }));
    }

    // Очищаем форму и ошибки
    const resetForm = () => {
      setData(initialData);
    }

    const handleSubmit = (e) => {
      // Отменяем базовые действия при сабмите формы
      e.preventDefault();
      resetForm();
      // Если поле username или password пустое, то ничего не делаем
      if (!data.email || !data.password) {
        return;
      }

      // Метод обработки логина
      auth.authorize(data.email, data.password)
        .then((res) => {
          // Секция для обработки ошибок запроса
          if (res.token) {
              props.setLoggedIn(true);
              // Записываем полученный jwt токен в локальное хранилище
              localStorage.setItem('jwt', res.token);
              props.tokenCheck();
              history.push('/cards');
          } else {
              setTooltipPic(failPic)
              setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
              setIsInfoTooltipOpen(true);
            };
        });
    }
    return (
      <>
        <Header>
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Header>
        <div className="login">
          <h2 className="login__title">Вход</h2>
          <form onSubmit={handleSubmit} className="login__form">
            <input onChange={handleChange} className="login__input" id="username" required name="email" value={data.email} type="text" placeholder="Email" />
            <input onChange={handleChange} className="login__input" id="password" required name="password" value={data.password} type="password"  placeholder="Пароль" />
            <div className="login__button-container">
              <button type="submit" className="login__link">Войти</button>
            </div>
          </form>
        </div>
        <InfoTooltip title={toolTipTitle} name="infotooltip" isOpen={isInfoTooltipOpen} image={tolltipPic} onClose={closeInfoTooltip} />
      </>
    );
}
export default Login;
