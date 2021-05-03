import React from "react";

import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";

function MealItem(props) {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  );
}

export default MealItem;