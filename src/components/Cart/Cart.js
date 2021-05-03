import React from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

function Cart(props) {
  const cartItems = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];
  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={classes["cart-item"]}>
        {cartItems.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onCloseCart} >Close</button>
      <button className={classes['button']}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
