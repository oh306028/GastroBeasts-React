import "./Register.css";
import food from "../assets/register-food.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [error, setError] = useState({
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateData = () => {
    const data = {
      nickName: nickName,
      email: email,
      password: password,
      confirmPassword: confPassword,
    };

    let isValid = true;
    const newError = {
      nickName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (data.nickName.length > 20) {
      newError.nickName = "Nickname cannot be longer than 20 characters";
      isValid = false;
    }

    if (data.email.length === 0) {
      newError.email = "Email cannot be empty";
      isValid = false;
    }

    if (data.nickName.length === 0) {
      newError.nickName = "Nick name cannot be empty";
      isValid = false;
    }

    if (data.password.length === 0) {
      newError.password = "Cannot be empty";
      isValid = false;
    }

    if (data.confirmPassword.length === 0) {
      newError.confPassword = "Cannot be empty";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const isValid = validateData();

    if (!isValid) {
      return;
    } else {
      //send post request to register user
    }
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value.trimStart());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trimStart());
  };

  const passwordChangeHandle = (e) => {
    setPassword(e.target.value.trimStart());
  };

  const confirmPasswordChangeHandle = (e) => {
    setConfPassword(e.target.value.trimStart());
  };

  return (
    <>
      <div className="register-page-container">
        <img src={food} />
        <div className="register-container">
          <form className="register-form">
            <div>
              <input
                onChange={handleNickNameChange}
                type="text"
                placeholder="Nick name"
              ></input>
              {error.nickName && <span>{error.nickName}</span>}

              <input
                onChange={handleEmailChange}
                type="text"
                placeholder="Email"
              ></input>
              {error.email && <span>{error.email}</span>}
            </div>

            <div className="password-container">
              <div>
                <input
                  onChange={passwordChangeHandle}
                  className="password"
                  type="password"
                  placeholder="Password"
                />
                {error.password && (
                  <span className="error">{error.password}</span>
                )}
              </div>

              <div>
                <input
                  onChange={confirmPasswordChangeHandle}
                  className="rightPassword"
                  type="password"
                  placeholder="Confirm password"
                />
                {error.confPassword && (
                  <span className="error">{error.confPassword}</span>
                )}
              </div>
            </div>

            <button
              onClick={handleRegistration}
              className="submit"
              type="submit"
            >
              Register
            </button>
            <Link to="/login">Have account?</Link>
          </form>
        </div>
      </div>
    </>
  );
};
