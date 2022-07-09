import React from "react";
import { Link } from "react-router-dom";
import './mainMenu.scss';

function MainMenu() {
  return (
    <div className="menu">
      <ul>
        <Link to ="/enter"><li>Вход</li></Link>
        <Link to ="/"><li>Регистрация</li></Link>
      </ul>
    </div>
  );
}

export default MainMenu;
