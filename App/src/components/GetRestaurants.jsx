import { useEffect } from "react";
import { useState } from "react";
import { RestaurantList } from "./RestaurantList";

export const GetRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch("http://localhost:5194/api/restaurants/all");
      const results = await response.json();

      setRestaurants(results);
      console.log(results);
    };
    fetchRestaurants();
  }, []);

  return <RestaurantList data={restaurants}></RestaurantList>;
};
