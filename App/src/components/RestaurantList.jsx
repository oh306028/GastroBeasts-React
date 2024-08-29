export const RestaurantList = ({ data }) => {
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
        {data.map((r) => (
          <li key={r.id}>
            <h3>{r.name}</h3>
            {GetCategories(r.categories)}
            <p>{r.description}</p>
            Reviews:
            {GetReviews(r.reviews)}
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      <ul>
        <CreateListItem></CreateListItem>
      </ul>
    </>
  );
};
