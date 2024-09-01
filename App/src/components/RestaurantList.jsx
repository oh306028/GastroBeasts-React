import React, { useState } from "react";
import "./RestaurantList.css";

export const RestaurantList = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = props.data;

  const GetCategories = (categories) => {
    return (
      <>
        {categories.map((category) => (
          <h5 key={category.id}>{category.name}</h5>
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

  const CreateListItem = () => {
    return (
      <>
        {data.map((r, index) => (
          <li key={r.id}>
            <h3>{r.name}</h3>
            {GetCategories(r.categories)}
            <p>{r.description}</p>

            <button onClick={() => handleButtonClick(index)}>
              {activeIndex !== index ? "GetReviews" : "HideReviews"}
            </button>
            {activeIndex === index && GetReviews(r.reviews)}
          </li>
        ))}
      </>
    );
  };

  const handleButtonClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <ul>
        <CreateListItem />
      </ul>
    </>
  );
};
