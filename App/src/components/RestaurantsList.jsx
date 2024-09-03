import { useEffect, useState } from "react";
import "./RestaurantList.css";
import { GetCategories } from "./RestaurantTile";

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5194/api/restaurants/all");
      const result = await response.json();

      setRestaurants(result);
      console.log(result);
    };
    fetchData();
  }, []);

  const RenderAverageStars = ({ reviews }) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return <p>Avg Stars: no reviews</p>;
    }

    const avgStars =
      reviews.reduce((sum, review) => sum + review.stars.star, 0) /
      reviews.length;

    return (
      <>
        <p>Avg Stars: {avgStars.toFixed(1)}</p>
      </>
    );
  };

  const RenderRestaurantTile = () => {
    return (
      <>
        {restaurants.map((r) => (
          <li key={r.id}>
            <div className="list-elements-container">
              <h1>"{r.name}"</h1>
              <ul className="list-categories-container">
                <GetCategories categories={r.categories} />
              </ul>
              <p>{r.description}</p>
              <RenderAverageStars reviews={r.reviews} />
            </div>
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="beast-list-container">
        <ul>
          <RenderRestaurantTile />
        </ul>
      </div>
    </>
  );
};
