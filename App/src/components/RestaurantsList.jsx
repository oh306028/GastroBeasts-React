import { useEffect, useState } from "react";
import "./RestaurantList.css";
import { GetCategories } from "./RestaurantTile";
import navigationImg from "../assets/navigation.png";

export const RenderAverageStars = ({ reviews }) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p>Avg Stars: no reviews</p>;
  }

  const avgStars =
    reviews.reduce((sum, review) => sum + review.stars.star, 0) /
    reviews.length;

  return (
    <>
      <p className="avg">Avg Stars: {avgStars.toFixed(1)}</p>
    </>
  );
};

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

  const RenderRestaurantTile = () => {
    return (
      <>
        {restaurants.map((r) => (
          <li key={r.id}>
            <div className="list-elements-container">
              <h1 className="title">{r.name}</h1>
              <ul className="list-categories-container">
                <GetCategories categories={r.categories} />
              </ul>

              <ul className="address-container">
                <li>
                  <img className="navigationImg" src={navigationImg} />
                </li>
                <li>
                  <h4>{r.address.city},</h4>
                </li>
                <li>
                  <h4>{r.address.street}</h4>
                </li>
                <li>
                  <h4>{r.address.number}</h4>
                </li>
              </ul>
              <p className="descr">{r.description}</p>
              <RenderAverageStars reviews={r.reviews} />
            </div>
          </li>
        ))}
      </>
    );
  };

  const GenerateAllCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        const response = await fetch(
          "http://localhost:5194/api/restaurants/categories"
        );
        const result = await response.json();
        setCategories(result);
      };
      fetchCategories();
    }, []);

    return (
      <>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="beast-page-container">
        <div className="categories-list-menu">
          <h1>Categories</h1>
          <ul>
            <GenerateAllCategories />
          </ul>
          <hr />
          <h1>Stars</h1>
          <ul>
            <li>5</li>
            <li>4</li>
            <li>3</li>
            <li>2</li>
            <li>1</li>
          </ul>
        </div>

        <div className="beast-list-container">
          <div className="user-usage-container">
            <input type="text" placeholder="Search a phrase..."></input>
            <button>NEW BEAST</button>
          </div>
          <ul className="beast-tiles-list">
            <RenderRestaurantTile />
          </ul>
        </div>
      </div>
    </>
  );
};
