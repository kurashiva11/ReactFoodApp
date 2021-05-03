import React, { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const hasitems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };

  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={classes["cart-item"]}>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          );
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasitems && <button className={classes["button"]}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
