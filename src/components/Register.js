import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import failPic from '../images/signup-fail.svg';
import successPic from '../images/signup-success.svg';

function Register(props) {
  // попап с уыедомлением о регистрации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [toolTipTitle, setTooltipTitle] = React.useState('');
  const [tolltipPic, setTooltipPic] = React.useState('')
  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false)
  }
  // данные пользователя
  const initialData = {
    email: '',
    password: '',
  };
  const [data, setData] = React.useState(initialData);
  const history = useHistory();

  // подписка на изменение инпутов
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }
  // сброс формы
  const resetForm = () => {
    setData(initialData);
  }
  const redirect = () => {
    closeInfoTooltip()
    history.push('/signin');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Если поле username, email или password пустое, то ничего не делаем
    if (!data.password || !data.email) {
      return;
    }
    auth.register(data.email, data.password)
      .then((res) => {
        // console.log(res)
        resetForm();
        if (res === undefined) {
          setTooltipPic(failPic)
          setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
          setIsInfoTooltipOpen(true);
        } else {
          setTooltipPic(successPic)
          setTooltipTitle('Вы успешно зарегистрировались');
          setIsInfoTooltipOpen(true);
        }
      })
      // Перенаправляем пользователя на страницу логина при успешной регистрации
      // .then(() => history.push('/signin'))
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Header>
        <Link to="/signin" className="header__link">Войти</Link>
      </Header>
      <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <input onChange={handleChange} className="register__input" id="email" required name="email" type="text" value={data.email} placeholder="Email" />
          <input onChange={handleChange} className="register__input" id="password" required name="password" type="password" value={data.password}  placeholder="Пароль" />
          <div className="register__button-container">
            <button type="submit" className="register__link">Зарегистрироваться</button>
          </div>
        </form>
        <div className="register__signup">
          <p className="register__signup-text">Уже зарегистрированы? &ensp;</p>
          <Link to="/signin" className="register__signup-link">Войти</Link>
        </div>
      </div>
      <InfoTooltip title={toolTipTitle} name="infotooltip" isOpen={isInfoTooltipOpen} image={tolltipPic} onClose={redirect} />
    </>
  );
}
export default Register;
