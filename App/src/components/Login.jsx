import "./Login.css";
import { Link } from "react-router-dom";
import foodImg from "../assets/food.png";
import { getToken, loginUser, registerUser, saveToken } from "./Authentication";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState({
    email: "",
    password: "",
  });

  const validateForm = (data) => {
    const newError = {
      email: "",
      password: "",
    };

    let isValidData = true;

    if (data.email.length === 0) {
      newError.email = "Email cannot be empty!";
      isValidData = false;
    }

    if (data.password.length === 0) {
      newError.password = "Password cannot be empty!";
      isValidData = false;
    }

    SetError(newError);
    return isValidData;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    const isValid = validateForm(loginData);

    if (!isValid) {
      return;
    } else {
      const refreshPage = () => {
        window.location.reload();
      };

      const token = await loginUser(loginData);
      saveToken(token);
      if (getToken() != null) {
        navigate("/beasts");
        refreshPage();
      }
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="login-page-container">
        <img src={foodImg} />
        <div className="login-container">
          <form className="login-form">
            <input
              onChange={handleEmail}
              type="text"
              placeholder="Email"
            ></input>
            {error.email && <span>{error.email}</span>}

            <input
              onChange={handlePassword}
              type="password"
              placeholder="Password"
            ></input>
            {error.password && <span>{error.password}</span>}

            <button onClick={handleSubmit} className="submit" type="submit">
              Login
            </button>
            <Link to="/register">Dont have account?</Link>
          </form>
        </div>
      </div>
    </>
  );
};
