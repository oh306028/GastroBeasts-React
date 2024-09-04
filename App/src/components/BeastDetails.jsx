import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const BeastDetails = () => {
  const location = useLocation();
  const data = location.state.restaurant;

  const [restaurant, setRestaurant] = useState({});

  console.log(data.reviews);

  useEffect(() => {
    setRestaurant(data);
  }, []);

  if (!restaurant.reviews) {
    return (
      <>
        <p>LOADING . . .</p>
      </>
    );
  }

  return (
    <>
      <p>ITS A DETAIL!</p>
      <h1>{restaurant.name}</h1>

      <ul>
        {restaurant.reviews.map((r) => (
          <li key={r.id}>{r.comment}</li>
        ))}
      </ul>
    </>
  );
};
