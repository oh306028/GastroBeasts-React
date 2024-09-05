export const ReviewList = ({ reviews }) => {
  console.log(reviews);
  return (
    <>
      <h1>Reviews</h1>
      <ul className="review-list">
        <hr />
        {reviews.map((r) => (
          <li key={r.id}>
            <div className="revieved-data-container">
              <h4>{r.reviewedBy.nickName}</h4>
              <h5>{r.postTime}</h5>
            </div>
            <p>- {r.comment}</p>
            <p>{r.stars.star}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};
