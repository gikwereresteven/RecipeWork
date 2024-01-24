import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import style from "./RecipeForm.module.css";

const RecipeForm = ({ onSaveRecipe }) => {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const navigate = useNavigate();

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const handleSaveClick = () => {
    const newRecipe = {
      name,
      instructions,
      calories: parseFloat(calories),
      cookingTime: parseInt(cookingTime),
      ingredients,
    };

    onSaveRecipe(newRecipe);

    navigate(`/recipes`);
  };

  return (
    <div className={style.formContainer}>
      <h1 className={style.title}>Create a New Recipe</h1>
      <label className={style.label}>Name:</label>
      <input
        className={style.input}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className={style.label}>Instructions:</label>
      <textarea
        className={style.textarea}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <label className={style.label}>Calories (per 100g):</label>
      <input
        className={style.input}
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />

      <label className={style.label}>Cooking Time (minutes):</label>
      <input
        className={style.input}
        type="number"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
      />

      <label className={style.label}>Ingredients:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={style.ingredientContainer}>
          <input
            className={style.input}
            type="text"
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
          />
          <input
            className={style.input}
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", e.target.value)
            }
          />
          <input
            className={style.input}
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              handleIngredientChange(index, "unit", e.target.value)
            }
          />
        </div>
      ))}
      <Button
        className={style.addButton}
        text="Add Ingredient"
        onClick={handleAddIngredient}
      />

      <Button
        className={style.saveButton}
        text="Save Recipe"
        onClick={handleSaveClick}
      />
    </div>
  );
};

export default RecipeForm;

RecipeForm.propTypes = {
  onSaveRecipe: PropTypes.func.isRequired,
};
