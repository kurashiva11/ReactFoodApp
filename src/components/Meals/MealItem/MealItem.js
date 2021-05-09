import React from "react";

import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";
// import CartContext from "../../../store/cart-context";
import { useDispatch } from "react-redux";
import cartSlice from '../../../store/redux-store/cart-slice';

function MealItem(props) {
  // const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItemAddHandler = (itemsNumber) => {
    // cartStore.addItem({
    //   id: props.id,
    //   name: props.name,
    //   amount: itemsNumber,
    //   price: props.price,
    // });
    dispatch(
      cartSlice.actions.add({
        id: props.id,
        name: props.name,
        amount: itemsNumber,
        price: props.price,
      })
    );
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
