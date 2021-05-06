import { useEffect, useState } from "react";
import axios from "axios";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";

function AvailableMeals() {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://reactfoodappbe-default-rtdb.firebaseio.com/meals.json`
        );
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data")
        }
        let fetchedData = await response.json();
        const data = [];
        for (let key in fetchedData) {
          data.push({
            id: key,
            name: fetchedData[key].name,
            desc: fetchedData[key].description,
            price: fetchedData[key].price,
          });
        }
        setIsFetchError(false);
        setMealsData(data);
      } catch (err) {
        console.log(err);
        setIsFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchMeals();
  }, []);

  // useMemo(() => function, input)

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  } else {
    if (isFetchError) {
      return (
        <section className={classes.ErrorFetch}>
          <p>Error while retrieving data.</p>
        </section>
      );
    } else if (mealsData.length === 0) {
      return (
        <section className={classes.NoDataToFetch}>
          <p>No Data Available</p>
        </section>
      );
    }
    return (
      <section className={classes.meals}>
        <Card>
          {mealsData.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                desc={meal.description}
                price={meal.price}
              />
            );
          })}
        </Card>
      </section>
    );
  }
}

export default AvailableMeals;
