import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const hasitems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasitems && (
        <button className={classes["button"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

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
      {isCheckout && <Checkout onCancel={props.onCloseCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
}

export default Cart;
