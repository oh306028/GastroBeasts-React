import { useEffect, useState } from "react";
import "./RestaurantTile.css";
import placesImage from "../assets/places.png";

export const RestaurantTile = () => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5194/api/restaurants/all");
      const result = await response.json();

      setRestaurant(result);
    };
    fetchData();
  }, []);

  return (
    <>
      <CreateTile data={restaurant} />
    </>
  );
};

const GetCategories = (categories) => {
  return (
    <>
      {categories.map((category) => (
        <li key={category.id}>
          {" "}
          <h5 key={category.id}>{category.name}</h5>
        </li>
      ))}
    </>
  );
};

const GetReviews = (reviews) => {
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
  console.log(idsCount);

  const randomId = Math.floor(Math.random() * idsCount);

  const restaurant = data.filter((i) => i.id === ids[randomId])[0];

  return restaurant;
};

const CreateTile = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const generateReviews = () => {
    return <ul className="reviews-list">{GetReviews(restaurant.reviews)}</ul>;
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const restaurant = generateRandomBest(data);

  return (
    <>
      <div className="content-container">
        <img src={placesImage} alt="Places" />
        <div className="randomBeast-container">
          <p className="beast">Today's Beast!</p>
          <div className="container">
            <h1>"{restaurant.name}"</h1>
            <ul className="categories-list">
              {GetCategories(restaurant.categories)}
            </ul>
            <p>{restaurant.description}</p>
            <div className="reviews-container">
              <button onClick={handleVisible}>
                {visible ? "Hide reviews" : "Show reviews"}
              </button>
              {!visible && (
                <>
                  <p>({Object.keys(restaurant.reviews).length})</p>
                </>
              )}
            </div>
            {visible && generateReviews()}
          </div>
        </div>
      </div>
    </>
  );
};
