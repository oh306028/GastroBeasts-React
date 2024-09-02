import "./GastroInfo.css";
import gastroTextImg from "../assets/cooltext465393048707419.png";

export const GastroInfo = () => {
  return (
    <>
      <div className="gastro-info-container">
        <img src={gastroTextImg} />
        <h3>
          GastroBeasts is your ultimate dining companion, bringing together the
          best restaurants, honest reviews, and insightful comments all in one
          place. Whether you're searching for hidden gems or popular spots,
          GastroBeasts helps you discover and share dining experiences with
          ease. Explore curated lists, read real feedback from fellow food
          lovers, and find the perfect place to eat, all within an intuitive app
          designed to make your food journey unforgettable.
        </h3>
      </div>
      <h2>Let us know about your feelings!</h2>
    </>
  );
};
