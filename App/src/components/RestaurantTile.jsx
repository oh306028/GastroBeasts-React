import { useEffect, useState } from "react";
import "./RestaurantTile.css";

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
        <li>
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

  const restaurant = data[0];
  console.log(restaurant);

  return (
    <>
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
    </>
  );
};
