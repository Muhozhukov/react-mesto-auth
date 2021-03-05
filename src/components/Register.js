import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';


function Register(props) {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Если поле username, email или password пустое, то ничего не делаем
    if (!data.password || !data.email) {
      return;
    }
    props.onRegister(data.email, data.password);
    resetForm();
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
    </>
  );
}
export default Register;
