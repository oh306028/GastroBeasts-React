import "./Login.css";
import { Link } from "react-router-dom";
import foodImg from "../assets/food.png";

export const Login = () => {
  return (
    <>
      <div className="login-page-container">
        <img src={foodImg} />
        <div className="login-container">
          <form className="login-form">
            <input type="text" placeholder="Email"></input>

            <input type="password" placeholder="Password"></input>

            <button className="submit" type="submit">
              Login
            </button>
            <Link to="/register">Dont have account?</Link>
          </form>
        </div>
      </div>
    </>
  );
};
