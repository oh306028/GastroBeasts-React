import { useState } from "react";

export const CreateReview = () => {
  const [toggleReviewAdd, setToggleReviewAdd] = useState(false);

  const handleToggleReview = () => {
    setToggleReviewAdd(!toggleReviewAdd);
  };

  const ReviewForm = () => {
    return (
      <>
        <h4>user</h4>
        <textarea placeholder="Enter your opinion..."></textarea>
        <p>Select stars:</p>
        <form>
          <input id="1" type="radio" name="stars"></input>
          <label for="1">1</label>
          <input id="2" type="radio" name="stars"></input>
          <label for="2">2</label>
          <input id="3" type="radio" name="stars"></input>
          <label for="3">3</label>
          <input id="4" type="radio" name="stars"></input>
          <label for="4">4</label>
          <input id="5" type="radio" name="stars"></input>
          <label for="5">5</label>
        </form>
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
