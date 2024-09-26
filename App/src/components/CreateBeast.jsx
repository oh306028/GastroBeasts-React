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
  const [error, SetError] = useState({
    name: "",
    descr: "",
    city: "",
    street: "",
    number: "",
    categories: "",
  });

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
    let isValidData = true;
    const newError = {
      name: "",
      descr: "",
      city: "",
      street: "",
      number: "",
      categories: "",
    };

    if (restName.length > 30) {
      isValidData = false;
      newError.name = "Name cannot be more than 30 characters long!";
    }
    if (restName.length === 0) {
      isValidData = false;
      newError.name = "Name cannot be empty!";
    }

    if (restDesc.length > 200) {
      isValidData = false;
      newError.descr = "Description cannot be more than 200 characters long!";
    }
    if (restDesc.length === 0) {
      isValidData = false;
      newError.descr = "Description cannot be empty!";
    }

    if (addressData.city.length > 20) {
      isValidData = false;
      newError.city = "City cannot be more than 20 characters!";
    }

    if (addressData.city.length === 0) {
      isValidData = false;
      newError.city = "City cannot be empty!";
    }

    if (addressData.street.length > 25) {
      isValidData = false;
      newError.street = "Street cannot be more than 20 characters!";
    }

    if (addressData.street.length === 0) {
      isValidData = false;
      newError.street = "Street cannot be empty!";
    }

    if (addressData.number.length > 10) {
      isValidData = false;
      newError.number = "Number cannot be more than 20 characters!";
    }

    if (addressData.number.length === 0) {
      isValidData = false;
      newError.number = "Number cannot be empty!";
    }

    SetError(newError);
    return isValidData;
  };

  const JoinCategoriesForRestaurant = async (id) => {
    try {
      await Promise.all(
        restCategories.map((category) =>
          fetch("http://localhost:5194/api/restaurants/" + id + "/categories", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
            body: JSON.stringify({ name: category }),
          })
        )
      );
      console.log("Categories joined successfully");
    } catch (error) {
      console.error("Error joining categories:", error);
    }
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

    const isValid = ValidateData();

    if (!isValid) {
      return;
    } else {
      try {
        const response = await CreateRestaurant();

        if (response && response.status === 201) {
          const location = response.headers.get("Location");
          const restaurantId = location.split("/").pop();

          console.log(restaurantId);

          await CreateAddress(restaurantId);
          await JoinCategoriesForRestaurant(restaurantId);
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
            {error.name && <span className="error">{error.name}</span>}
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
              {error.city && <span className="error">{error.city}</span>}
            </div>
            <div>
              <label for="Street">Street</label>

              <input
                onChange={(e) => setRestStreet(e.target.value.trim())}
                type="text"
                id="Street"
                placeholder="Street"
              ></input>
              {error.street && <span className="error">{error.street}</span>}
            </div>
            <div>
              <label for="Number">Number</label>

              <input
                onChange={(e) => setRestNumber(e.target.value.trim())}
                type="text"
                id="Number"
                placeholder="Number"
              ></input>
              {error.number && <span className="error">{error.number}</span>}
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
          {error.descr && <span className="error">{error.descr}</span>}
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
