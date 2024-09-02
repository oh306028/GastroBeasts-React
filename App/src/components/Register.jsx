import "./Register.css";
import food from "../assets/register-food.png";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <div className="register-page-container">
        <div className="register-container">
          <form className="register-form">
            <input type="text" placeholder="Nick name"></input>

            <input type="text" placeholder="Email"></input>

            <input
              className="name"
              type="password"
              placeholder="Password"
            ></input>

            <input
              className="name"
              type="password"
              placeholder="Confirm password"
            ></input>

            <button className="submit" type="submit">
              Register
            </button>
            <Link to="/login">Have account?</Link>
          </form>
        </div>
        <img src={food} />
      </div>
    </>
  );
};
