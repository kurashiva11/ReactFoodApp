import React from "react";

import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

import HeaderCardButton from "./HeaderCartButton";

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton onClick={props.onClickCart}>Cart</HeaderCardButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Meals JPG i missing or unable to Load" />
      </div>
    </>
  );
}

export default Header;
