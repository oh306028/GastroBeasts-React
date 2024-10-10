import { useState } from "react";
import { getToken } from "./Authentication";
import { useNavigate } from "react-router-dom";
import "./CreateReview.css";

const ReviewForm = ({
  comment,
  handleCommentChange,
  star,
  handleStarChange,
  handleSubmitReview,
}) => {
  return (
    <>
      <div className="review-form-container">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your opinion..."
        ></textarea>
        <p>Select stars:</p>
        <form className="stars-container" onSubmit={handleSubmitReview}>
          <input
            onChange={handleStarChange}
            id="1"
            checked={star == 1}
            type="radio"
            name="stars"
          />
          <label htmlFor="1">1</label>
          <input
            checked={star == 2}
            onChange={handleStarChange}
            id="2"
            type="radio"
            name="stars"
          />
          <label htmlFor="2">2</label>
          <input
            checked={star == 3}
            onChange={handleStarChange}
            id="3"
            type="radio"
            name="stars"
          />
          <label htmlFor="3">3</label>
          <input
            onChange={handleStarChange}
            checked={star == 4}
            id="4"
            type="radio"
            name="stars"
          />
          <label htmlFor="4">4</label>
          <input
            onChange={handleStarChange}
            id="5"
            checked={star == 5}
            type="radio"
            name="stars"
          />
          <label htmlFor="5">5</label>
          <div className="submit-button-revAdd">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export const CreateReview = (props) => {
  const [toggleReviewAdd, setToggleReviewAdd] = useState(false);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(1);
  const [buttonText, setButtonText] = useState("Add review");

  const handleToggleReview = () => {
    setToggleReviewAdd(!toggleReviewAdd);

    if (!toggleReviewAdd) {
      setButtonText("Hide review");
    } else {
      setButtonText("Add review");
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value.trimStart());
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    await postReview();
    window.location.reload();
  };

  const handleStarChange = (e) => {
    setStar(Number(e.target.id));
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

  return (
    <>
      <div className="reviewAdd-container">
        <button className="hideReview" onClick={handleToggleReview}>
          {buttonText}
        </button>
        {toggleReviewAdd && (
          <ReviewForm
            comment={comment}
            handleCommentChange={handleCommentChange}
            star={star}
            handleStarChange={handleStarChange}
            handleSubmitReview={handleSubmitReview}
          />
        )}
      </div>
    </>
  );
};
