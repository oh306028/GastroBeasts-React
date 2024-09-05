export const ReviewList = ({ reviews }) => {
  console.log(reviews);
  return (
    <>
      <h1>Reviews</h1>
      <ul className="review-list">
        {reviews.map((r) => (
          <li key={r.id}>
            <h4>{r.reviewedBy.nickName}</h4>
            <h5>{r.postTime}</h5>
            <p>{r.comment}</p>
            <p>{r.stars.star}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
