import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetCategories } from "./RestaurantTile";
import "./BeastDetails.css";
import navigationImg from "../assets/navigation.png";
import { RenderAverageStars } from "./RestaurantsList";
import { ReviewList } from "./ReviewList";
import { getToken, logout } from "./Authentication";
import { CreateReview } from "./CreateReview";

export const BeastDetails = () => {
  const location = useLocation();
  const data = location.state.restaurant;

  const [restaurant, setRestaurant] = useState({});

  console.log(data);

  useEffect(() => {
    console.log(getToken());
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

      <div className="details-container">
        <div className="details-info">
          <h1 className="title">{restaurant.name}</h1>
          <ul className="list-categories-container">
            <GetCategories categories={restaurant.categories} />
          </ul>
          <ul className="address-container">
            <li>
              <img className="navigationImg" src={navigationImg} />
            </li>
            <li>
              <h4>{restaurant.address.city},</h4>
            </li>
            <li>
              <h4>{restaurant.address.street}</h4>
            </li>
            <li>
              <h4>{restaurant.address.number}</h4>
            </li>
          </ul>
          <p>{restaurant.description}</p>
          <RenderAverageStars reviews={restaurant.reviews} />
        </div>

        <div className="vertical-line"></div>

        <div className="reviews-container">
          <ReviewList reviews={restaurant.reviews} />
        </div>
      </div>
      <CreateReview></CreateReview>
    </>
  );
};
