import { useState, useEffect } from "react";

export const CreateBeast = () => {
  const GenerateCategoriesCheckbox = () => {
    const [categories, setCategories] = useState([]);

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

    return (
      <>
        {categories.map((c) => (
          <ul>
            <li key={c.id}>
              <input id={c.name} type="checkbox"></input>
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
            id="restName"
            placeholder="restaurant name"
            type="text"
          ></input>
          <label>Categories</label>
          <GenerateCategoriesCheckbox />

          <label for="City">City</label>
          <input type="text" id="City" placeholder="City"></input>

          <label for="Street">City</label>
          <input type="text" id="Street" placeholder="Street"></input>

          <label for="Number">City</label>
          <input type="text" id="Number" placeholder="Number"></input>

          <label for="descr">Description</label>
          <textarea
            id="descr"
            type="text"
            placeholder="Write the restaurant description"
          ></textarea>
        </form>
      </div>
    </>
  );
};
