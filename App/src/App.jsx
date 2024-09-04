import { Footer } from "./components/Footer";
import { NavigationBar } from "./components/NavigationBar";
import "./App.css";
import { RestaurantTile } from "./components/RestaurantTile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GastroInfo } from "./components/GastroInfo";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { RestaurantList } from "./components/RestaurantsList";
import { BeastDetails } from "./components/BeastDetails";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />

        <Routes>
          <Route path="gastroInfo" element={<GastroInfo />} />
          <Route path="/" element={<RestaurantTile />} />
          <Route path="/beasts" element={<RestaurantList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="beasts/:name/details" element={<BeastDetails />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
