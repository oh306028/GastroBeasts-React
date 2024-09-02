import { Footer } from "./components/Footer";
import { GetRestaurants } from "./components/GetRestaurants";
import { NavigationBar } from "./components/NavigationBar";
import "./App.css";
import placesImage from "./assets/places.png";
import { RestaurantTile } from "./components/RestaurantTile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GastroInfo } from "./components/GastroInfo";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <div className="content-container">
          <img src={placesImage} alt="Places" />
          <Routes>
            <Route path="gastroInfo" element={<GastroInfo />} />
            <Route path="/" element={<RestaurantTile />} />
            <Route path="/beasts" element={<GetRestaurants />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
