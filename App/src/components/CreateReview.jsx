import { useState } from "react";
import { getToken } from "./Authentication";

export const CreateReview = (props) => {
  const [toggleReviewAdd, setToggleReviewAdd] = useState(false);

  const [comment, setComment] = useState();
  const [star, setStar] = useState(1);

  const handleToggleReview = () => {
    setToggleReviewAdd(!toggleReviewAdd);
  };

  const handleCommentChange = () => {
    (e) => setComment(e.target.value.trimStart());
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    await postReview();
    setToggleReviewAdd(false);
  };

  const handleStarChange = (e) => {
    setStar(e.target.id);
  };

  const postReview = async () => {
    const reviewData = {
      comment: comment,
      stars: star,
    };

    try {
      await fetch(
        `http://localhost:5194/api/restaurants/${props.restaurantId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          body: JSON.stringify(reviewData),
        }
      );
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const ReviewForm = () => {
    return (
      <>
        <h4>user</h4>
        <textarea
          onChange={handleCommentChange}
          placeholder="Enter your opinion..."
        ></textarea>
        <p>Select stars:</p>
        <form>
          <input
            onChange={handleStarChange}
            id="1"
            checked={star == 1}
            type="radio"
            name="stars"
          ></input>
          <label for="1">1</label>
          <input
            checked={star == 2}
            onChange={handleStarChange}
            id="2"
            type="radio"
            name="stars"
          ></input>
          <label for="2">2</label>
          <input
            checked={star == 3}
            onChange={handleStarChange}
            id="3"
            type="radio"
            name="stars"
          ></input>
          <label for="3">3</label>
          <input
            onChange={handleStarChange}
            checked={star == 4}
            id="4"
            type="radio"
            name="stars"
          ></input>
          <label for="4">4</label>
          <input
            onChange={handleStarChange}
            id="5"
            checked={star == 5}
            type="radio"
            name="stars"
          ></input>
          <label for="5">5</label>
        </form>
        <button onClick={handleSubmitReview}>Send</button>
      </>
    );
  };

  return (
    <>
      <div className="reviewAdd-container">
        <button onClick={handleToggleReview}>Add review</button>
        {toggleReviewAdd && <ReviewForm />}
      </div>
    </>
  );
};
