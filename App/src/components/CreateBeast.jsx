import { useState, useEffect } from "react";

export const CreateBeast = () => {
  const [categories, setCategories] = useState([]);
  const [restName, setRestName] = useState("");
  const [restCity, setRestCity] = useState("");
  const [restStreet, setRestStreet] = useState("");
  const [restNumber, setRestNumber] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const [restCategories, setRestCategories] = useState([]);

  useEffect(() => {
    console.log(restDesc);
  }, [restDesc]);

  const handleSubmit = () => {
    //generating post endpoints
    //generating data from inputs
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
          <label for="restName">Restaurant name</label>
          <input
            onChange={(e) => setRestName(e.target.value.trimStart())}
            id="restName"
            placeholder="restaurant name"
            type="text"
          ></input>
          <label>Categories</label>
          <GenerateCategoriesCheckbox />

          <label for="City">City</label>
          <input
            onChange={(e) => setRestCity(e.target.value.trim())}
            type="text"
            id="City"
            placeholder="City"
          ></input>

          <label for="Street">City</label>
          <input
            onChange={(e) => setRestStreet(e.target.value.trim())}
            type="text"
            id="Street"
            placeholder="Street"
          ></input>

          <label for="Number">City</label>
          <input
            onChange={(e) => setRestNumber(e.target.value.trim())}
            type="text"
            id="Number"
            placeholder="Number"
          ></input>

          <label for="descr">Description</label>
          <textarea
            onChange={(e) => setRestDesc(e.target.value.trimStart())}
            id="descr"
            type="text"
            placeholder="Write the restaurant description"
          ></textarea>
          <button onClick={handleSubmit()} type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
};
