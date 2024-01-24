// RecipeInput.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./RecipeInput.module.css";
import Button from "../Button/Button";

export default function RecipeInput({ onFilterChange }) {
  const [inputValue, setInputValue] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onFilterChange(value, showFavoritesOnly);
  };

  const handleCheckboxChange = () => {
    const updatedShowFavoritesOnly = !showFavoritesOnly;
    setShowFavoritesOnly(updatedShowFavoritesOnly);
    onFilterChange(inputValue, updatedShowFavoritesOnly);
  };

  const handleAddRecipeClick = () => {
    navigate("/recipes/new");
  };

  if (location.pathname.includes("/recipes/")) {
    return null;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}> My Recipes</h1>
      <input
        className={style.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Recipe  Search ..."
      />
      <label>
        Show Favorites Only
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={handleCheckboxChange}
        />
      </label>
      <Button text="ADD Recipe" onClick={handleAddRecipeClick} />
    </div>
  );
}

RecipeInput.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
