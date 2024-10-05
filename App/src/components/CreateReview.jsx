import { useState } from "react";

export const CreateReview = () => {
  const [toggleReviewAdd, setToggleReviewAdd] = useState(false);

  const handleToggleReview = () => {
    setToggleReviewAdd(!toggleReviewAdd);
  };

  const ReviewForm = () => {
    return (
      <>
        <form>
          <h4>User name</h4>
          <input type="text" placeholder="Enter the review"></input>
        </form>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
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
