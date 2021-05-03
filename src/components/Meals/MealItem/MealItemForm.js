import React, { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";

import Input from "../../UI/Input";

function MealItemForm(props) {
  const mealItemRef = useRef();
  const [amoutIsValid, setAmoutIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = mealItemRef.current.value;
    const enterdedAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enterdedAmountNumber < 1 ||
      enterdedAmountNumber > 5
    ) {
      setAmoutIsValid(false);
      return;
    }
    setAmoutIsValid(true);
    props.onCartItemAdd(enterdedAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={mealItemRef}
        label="Amount"
        input={{
          id: "amounnt_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amoutIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
