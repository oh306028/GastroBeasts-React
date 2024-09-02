import "./NavigationBar.css";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
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
      <Link to="/login">
        <p>SIGN IN</p>
      </Link>
    </div>
  );
};
