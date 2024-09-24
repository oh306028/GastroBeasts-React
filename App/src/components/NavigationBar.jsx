import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { getToken, logout } from "./Authentication";
import { useEffect, useState } from "react";

export const NavigationBar = () => {
  const [token, SetToken] = useState();

  useEffect(() => {
    let currentToken = getToken();
    console.log(currentToken);
    SetToken(currentToken);
  }, []);

  const handleLogout = () => {
    logout();
    SetToken(null);
  };

  return (
    <div className="nav-bar">
      <Link to="gastroInfo">
        <p>GASTRO-BEASTS</p>
      </Link>

      <div className="nav-info">
        <Link to="/">
          <p>HOME</p>
        </Link>
        <Link to="/beasts">
          <p>BEASTS</p>
        </Link>
        <Link to="/contact">
          <p>CONTACT</p>
        </Link>
      </div>
      {token === null ? (
        <Link to="/login">
          <p>SIGN IN</p>
        </Link>
      ) : (
        <Link to="/">
          <p onClick={handleLogout}>LOGOUT</p>
        </Link>
      )}
    </div>
  );
};
