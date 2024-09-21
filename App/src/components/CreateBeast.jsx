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

  const restData = {
    name: restName,
    description: restDesc,
  };

  const addressData = {
    city: restCity,
    street: restStreet,
    number: restNumber,
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

    try {
      const response = await CreateRestaurant();

      if (response && response.status === 201) {
        const location = response.headers.get("Location");
        const restaurantId = location.split("/").pop();

        console.log(restaurantId);

        await CreateAddress(restaurantId);
      } else {
        console.error("Failed to create restaurant. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const GenerateCategoriesCheckbox = () => {
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

    return (
      <>
        {categories.map((c) => (
          <ul>
            <li key={c.id}>
              <input
                onClick={handleCheckbox}
                id={c.name}
                type="checkbox"
              ></input>
              <label for={c.name}>{c.name}</label>
            </li>
          </ul>
        ))}
      </>
    );
  };

  return (
    <>
      <h1>dd</h1>
      <div className="form-container">
        <form>
          <div>
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
          <div>
            <div>
              <label for="City">City</label>
            </div>
            <input
              onChange={(e) => setRestCity(e.target.value.trim())}
              type="text"
              id="City"
              placeholder="City"
            ></input>
            <div>
              <label for="Street">Street</label>
            </div>
            <input
              onChange={(e) => setRestStreet(e.target.value.trim())}
              type="text"
              id="Street"
              placeholder="Street"
            ></input>
            <div>
              <label for="Number">Number</label>
            </div>
            <input
              onChange={(e) => setRestNumber(e.target.value.trim())}
              type="text"
              id="Number"
              placeholder="Number"
            ></input>
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
            <button onClick={handleSubmit} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
