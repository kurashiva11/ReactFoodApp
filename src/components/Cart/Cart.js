import React, { useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

import CartItem from "./CartItem";
import Checkout from "./Checkout";
// import CartContext from "../../store/cart-context";
import { useSelector, useDispatch } from "react-redux";
import cartSlice from '../../store/redux-store/cart-slice';

function Cart(props) {
  // const cartCtx = useContext(CartContext);
  const cartStore = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const hasitems = cartStore.items.length > 0;

  const cartItemAddHandler = (item) => {
    // cartCtx.addItem({ ...item, amount: 1 });
    dispatch(cartSlice.actions.add({ ...item, amount: 1 }));
  };

  const cartItemRemoveHandler = (itemId) => {
    // cartCtx.removeItem(itemId);
    dispatch(cartSlice.actions.remove({ id: itemId }));
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const respose = await fetch(
      "https://reactfoodappbe-default-rtdb.firebaseio.com/orders.json",
      {
        method: "post",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartStore.items,
        }),
      }
    );

    if (!respose.ok) {
      // throw new Error("Something went wrong while posing data to firebase");
      console.log(respose);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setDidSubmit(true);
    // cartCtx.clearCart();
    dispatch(cartSlice.actions.clear())
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

  const cartModalContent = (
    <>
      <ul className={classes["cart-item"]}>
        {cartStore.items.map((item) => {
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
        <span>${cartStore.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
