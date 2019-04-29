import React from "react";
import style from '../modules/header.module.css'

function NavBar() {
  return (
          <nav className={style.navBar}>
            <h1>Recipe Look Up with <a href="https://developer.edamam.com/" target="_blank">Edamam</a></h1>
          </nav>
  );
}
export default NavBar;
