import { useState, useEffect } from "react";
import { getToken } from "./Authentication";
import "./CreateBeast.css";

export const CreateBeast = () => {
  const [categories, setCategories] = useState([]);
  const [restName, setRestName] = useState("");
  const [restCity, setRestCity] = useState("");
  const [restStreet, setRestStreet] = useState("");
  const [restNumber, setRestNumber] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const [restCategories, setRestCategories] = useState([]);
  const [isValid, SetIsValid] = useState(true);

  const restData = {
    name: restName,
    description: restDesc,
  };

  const addressData = {
    city: restCity,
    street: restStreet,
    number: restNumber,
  };

  const ValidateData = () => {
    if (restName > 30 || restName.length == 0) SetIsValid(false);

    if (restDesc > 200) SetIsValid(false);

    if (addressData.city.length > 20) SetIsValid(false);

    if (addressData.street.length > 25) SetIsValid(false);

    if (addressData.number.length > 10) SetIsValid(false);
  };

  const CreateAddress = async (id) => {
    try {
      await fetch("http://localhost:5194/api/restaurants/" + id + "/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(addressData),
      });
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const CreateRestaurant = async () => {
    try {
      const response = await fetch("http://localhost:5194/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(restData),
      });

      return await response;
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    ValidateData();

    if (!isValid) {
      alert("Wrong data!");
    } else {
      try {
        const response = await CreateRestaurant();

        if (response && response.status === 201) {
          const location = response.headers.get("Location");
          const restaurantId = location.split("/").pop();

          console.log(restaurantId);

          await CreateAddress(restaurantId);
        } else {
          console.error(
            "Failed to create restaurant. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "http://localhost:5194/api/restaurants/categories"
      );
      const result = await response.json();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  const handleCheckbox = (e) => {
    const categoryId = e.target.id;

    setRestCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((category) => category !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const GenerateCategoriesCheckbox = () => {
    return (
      <>
        <ul>
          {categories.map((c) => (
            <li key={c.name}>
              <input
                onChange={handleCheckbox}
                id={c.name}
                type="checkbox"
                checked={restCategories.includes(c.name)}
              ></input>
              <label for={c.name}>{c.name}</label>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <h1>dd</h1>
      <div className="form-container">
        <form>
          <div className="restname-container">
            <div>
              <label for="restName">Restaurant name</label>
            </div>
            <input
              onChange={(e) => setRestName(e.target.value.trimStart())}
              id="restName"
              placeholder="restaurant name"
              type="text"
            ></input>
          </div>
          <div>
            <label>Categories</label>
            <GenerateCategoriesCheckbox />
          </div>

          <div className="address-container">
            <div>
              <label for="City">City</label>

              <input
                onChange={(e) => setRestCity(e.target.value.trim())}
                type="text"
                id="City"
                placeholder="City"
              ></input>
            </div>
            <div>
              <label for="Street">Street</label>

              <input
                onChange={(e) => setRestStreet(e.target.value.trim())}
                type="text"
                id="Street"
                placeholder="Street"
              ></input>
            </div>
            <div>
              <label for="Number">Number</label>

              <input
                onChange={(e) => setRestNumber(e.target.value.trim())}
                type="text"
                id="Number"
                placeholder="Number"
              ></input>
            </div>
          </div>

          <div>
            <label for="descr">Description</label>
          </div>
          <textarea
            onChange={(e) => setRestDesc(e.target.value.trimStart())}
            id="descr"
            type="text"
            placeholder="Write the restaurant description"
          ></textarea>
          <div>
            <button
              className="addRestButton"
              onClick={handleSubmit}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
