import { Footer } from "./components/Footer";
import { GetRestaurants } from "./components/GetRestaurants";
import { NavigationBar } from "./components/NavigationBar";

import "./App.css";
import mapImage from "./assets/map.png";
import placesImage from "./assets/places.png";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="content-container">
        <img src={placesImage} alt="Places" />
        <GetRestaurants />
      </div>
      <Footer />
    </>
  );
}

export default App;
