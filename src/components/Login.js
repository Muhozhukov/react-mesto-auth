import React from 'react';
import Header from './Header';
import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

  function Login(props) {

    function closeInfoTooltip() {
      props.setTooltipIsOpen(false)
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
      props.onLogin(data.email, data.password);
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
        <InfoTooltip
          title={props.toolTipTitle}
          name="infotooltip"
          isOpen={props.isInfoTooltipOpen}
          image={props.tolltipPic}
          onClose={closeInfoTooltip} />
      </>
    );
}
export default Login;
