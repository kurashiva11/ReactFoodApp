import React, { useContext } from "react";

import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const cartItemAddHandler = (itemsNumber) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: itemsNumber,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onCartItemAdd={cartItemAddHandler} />
      </div>
    </li>
  );
}

export default MealItem;
