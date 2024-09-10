import { useEffect, useState } from "react";
import "./RestaurantList.css";
import { GetCategories } from "./RestaurantTile";
import navigationImg from "../assets/navigation.png";
import { Link } from "react-router-dom";

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
  const [restaurantName, setRestaurantName] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5194/api/restaurants/all");
      const result = await response.json();

      setRestaurants(result);
      setFilteredRestaurants(result);
      console.log(result);
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    const inputValue = e.target.value.trim();
    setRestaurantName(inputValue);
    setFilteredRestaurants(
      restaurants.filter((r) =>
        r.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  const RenderRestaurantTile = () => {
    return (
      <>
        {filteredRestaurants.map((r) => (
          <li className="beast-tile" key={r.id}>
            <Link
              className="linkDetails"
              to={`/beasts/${r.name}/details`}
              state={{ restaurant: r }}
            >
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
            </Link>
          </li>
        ))}
      </>
    );
  };

  const handleCategoryFilter = (e) => {
    const categoryFilterValue = e.target.innerText;
    let filtered;

    setIsClicked(!isClicked);

    if (isClicked) {
      e.target.classList.add("clickedCategory");
      filtered = restaurants.filter((r) =>
        r.categories.some((c) => c.name.includes(categoryFilterValue))
      );
    } else {
      e.target.classList.remove("clickedCategory");
      filtered = restaurants;
    }
    setIsClicked(!isClicked);
    console.log(e);
    setFilteredRestaurants(filtered);
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
          <li onClick={handleCategoryFilter} className="category-el" key={c.id}>
            {c.name}
          </li>
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
            <input
              onChange={handleInput}
              value={restaurantName}
              type="text"
              placeholder="Search a phrase..."
            ></input>
            <Link to="/create">
              <button>NEW BEAST</button>
            </Link>
          </div>
          <ul className="beast-tiles-list">
            <RenderRestaurantTile />
          </ul>
        </div>
      </div>
    </>
  );
};
