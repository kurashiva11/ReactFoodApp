import React, { useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

// import CartContext from "../../store/cart-context";
import { useSelector } from 'react-redux';


function HeaderCartButton(props) {
  const [ btnIsHighLated, setBtnIsHighLated ] = useState(false);
  const cartSlice = useSelector(state => state.cartStore);
  // const cartCtx = useContext(CartContext);
  const { items } = cartSlice; // cartCtx;

  const numberOfCartItems = items.reduce((curEle, item) => {
    return curEle + item.amount;
  }, 0);


  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLated(true);


    const timer = setTimeout(() => {
      setBtnIsHighLated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={classes.button + ` ${btnIsHighLated && classes.bump}`} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
