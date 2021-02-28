import React from 'react';
import logoPath from '../images/logo.svg';
import { Link } from 'react-router-dom'; 
function Header(props) {
  return (
    <header className="header">
        <img src={logoPath} alt="Логотип страницы Место" className="header__logo" />
        <div className="header__info">
          {props.children}
        </div>
    </header>
  );
}

export default Header;