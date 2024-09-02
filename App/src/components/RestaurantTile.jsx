import { useEffect, useState } from "react";
import "./RestaurantTile.css";
import placesImage from "../assets/places.png";

export const RestaurantTile = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5194/api/restaurants/all");
      const result = await response.json();

      setRestaurantData(result);
      setRestaurant(generateRandomBest(result));
    };
    fetchData();
  }, []);

  const handleReset = () => {
    setRestaurant(generateRandomBest(restaurantData));
  };

  return (
    <>
      <CreateTile restaurant={restaurant} handleReset={handleReset} />
    </>
  );
};

const GetCategories = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <li key={category.id}>
          {" "}
          <h5>{category.name}</h5>
        </li>
      ))}
    </>
  );
};

const GetReviews = ({ reviews }) => {
  return (
    <>
      <ul>
        {reviews.map((r, index) => (
          <li key={index}>
            {r.comment} - {r.reviewedBy.nickName}
          </li>
        ))}
      </ul>
    </>
  );
};

const generateRandomBest = (data) => {
  const ids = data.map((i) => i.id);
  const idsCount = ids.length;

  const randomId = Math.floor(Math.random() * idsCount);

  const restaurant = data.filter((i) => i.id === ids[randomId])[0];

  return restaurant;
};

const CreateTile = ({ restaurant, handleReset }) => {
  if (!restaurant) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="content-container">
        <img src={placesImage} alt="Places" />
        <div className="randomBeast-container">
          <p className="beast">Random Beast</p>
          <div className="container">
            <h1>"{restaurant.name}"</h1>
            <ul className="categories-list">
              <GetCategories categories={restaurant.categories} />
            </ul>
            <p>{restaurant.description}</p>
          </div>
          <button onClick={handleReset} className="refresh">
            Refresh
          </button>
        </div>
      </div>
    </>
  );
};
